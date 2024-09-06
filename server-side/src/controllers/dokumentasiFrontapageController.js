const { DokumentasiFrontpage } = require("../models");
const fs = require("fs");
const path = require("path");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const { nama } = req.body;
        const image = req.file ? req.file.buffer : null;

        if (image && nama) {
            const dir = "public/images/dokumentasi";
            ensureDir(dir);
            image_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, image_name), image);
        }

        const dokumentasi = await DokumentasiFrontpage.create({
            nama,
            image: image_name,
        });

        res.status(201).json({
            message: "Dokumentasi Berhasil ditambahkan!",
            data: dokumentasi,
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
        const dokumentasi = await DokumentasiFrontpage.findAll();
        res.status(200).json({
            message: "Dokumentasi berhasil diambil!",
            data: dokumentasi,
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
        const dokumentasi = await DokumentasiFrontpage.findByPk(req.params.id);
        if (!dokumentasi) {
            return res.status(404).json({ message: "Dokumentasi tidak ada!" });
        }
        res.status(200).json({
            message: "Dokumentasi berhasil diambil",
            data: dokumentasi,
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
        const { nama } = req.body;
        const image = req.file ? req.file.path : null;

        const dokumentasi = await DokumentasiFrontpage.findByPk(req.params.id);
        if (!dokumentasi) {
            return res.status(404).json({ message: "Dokumentasi tidak ada" });
        }

        let image_name = dokumentasi.image;
        if (req.file) {
            const dir = "public/images/dokumentasi";
            ensureDir(dir);
            image_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, image_name), req.file.buffer);

            if (dokumentasi.image) {
                const oldImagePath = path.join(dir, dokumentasi.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await dokumentasi.update({
            nama,
            image: image_name,
        });

        res.status(200).json({
            message: "Dokumentasi berhasil diperbaharui!",
            data: dokumentasi,
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
        const dokumentasi = await DokumentasiFrontpage.findByPk(req.params.id);
        if (!dokumentasi) {
            return res.status(404).json({ message: "Dokumentasi tidak ada!" });
        }

        // Delete image file
        if (dokumentasi.image) {
            const imagePath = path.resolve(
                `public/images/tentang-dokumentasi/${dokumentasi.image}`
            );
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error(err);
                });
            }
        }

        await dokumentasi.destroy();
        res.status(200).json({
            message: "Dokumentasi berhasil dihapus",
            data: dokumentasi,
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
    const dir = "public/images/dokumentasi";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
