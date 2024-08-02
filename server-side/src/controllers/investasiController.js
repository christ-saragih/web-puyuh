const { Investasi } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const { default: slugify } = require("slugify");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const {
            judul,
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        } = req.body;
        const adminId = req.admin.id;

        const gambar = req.file ? req.file.buffer : null;

        if (
            gambar &&
            judul &&
            penerbit &&
            penggunaan_dana &&
            jaminan_kebendaan &&
            bagi_hasil &&
            minimum_investasi &&
            maksimum_investasi &&
            satuan_perdagangan &&
            minimum_pendanaan &&
            maksimum_pendanaan &&
            tenor &&
            pembayaran_bagi_hasil &&
            tanggal_pembukaan_penawaran &&
            tanggal_berakhir_penawaran &&
            status
        ) {
            const dir = "public/images/investasi";
            ensureDir(dir);
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, gambar_name), gambar);
        }

        const investasi = await Investasi.create({
            adminId: adminId,
            judul,
            gambar: gambar_name,
            slug: slugify(judul, { replacement: "-", lower: true }),
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        });

        res.status(201).json({
            message: "Data  Berhasil Ditambahkan!",
            data: investasi,
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const messages = error.errors.map((err) => err.message);
            res.status(400).json({
                message: "Validation error",
                errors: messages,
            });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
};

// Read All
exports.findAll = async (req, res) => {
    try {
        const investasi = await Investasi.findAll();
        res.status(200).json({
            message: "Data  berhasil diambil!",
            data: investasi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read One
exports.findOne = async (req, res) => {
    try {
        const investasi = await Investasi.findByPk(req.params.id);
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }
        res.status(200).json({
            message: "Data  berhasil diambil",
            data: investasi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read one By Slug
exports.findDataBySlug = async (req, res) => {
    try {
        const investasi = await Investasi.findOne({
            where: { slug: req.params.slug },
            include: Tag,
        });
        if (!investasi) {
            return res.status(404).json({ message: "Investasi tidak!" });
        }
        res.status(200).json({
            message: "Data  berhasil diambil",
            data: investasi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const {
            judul,
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        } = req.body;

        const investasi = await Investasi.findByPk(req.params.id);

        const adminId = req.admin.id;
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }

        let gambar_name = investasi.gambar;
        if (req.file) {
            const dir = "public/images/investasi";
            ensureDir(dir);
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, gambar_name), req.file.buffer);

            if (investasi.gambar) {
                const oldImagePath = path.join(dir, investasi.gambar);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await investasi.update({
            adminId: adminId,
            judul,
            gambar: gambar_name,
            slug: slugify(judul, { replacement: "-", lower: true }),
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        });

        res.status(200).json({
            message: "Data  berhasil diperbaharui",
            data: investasi,
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const messages = error.errors.map((err) => err.message);
            res.status(400).json({
                message: "Validation error",
                errors: messages,
            });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const investasi = await Investasi.findByPk(req.params.id);
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }

        // Delete image file
        if (investasi.gambar) {
            const imagePath = path.resolve(
                `public/images/investasi/${investasi.gambar}`
            );
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }

        await investasi.destroy();
        res.status(200).json({
            message: "Data  berhasil dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get Image by Name
exports.getImageByName = (req, res) => {
    const { gambar } = req.params;
    const dir = "public/images/investasi";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
