const { Artikel, Tag, ArtikelTag } = require("../models");
const fs = require("fs");
const path = require("path");
const { where } = require("sequelize");
const slugify = require("slugify");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const { penulis, judul, deskripsi, tanggal, tags } = req.body;
        let gambar_name = null;

        if (req.file && penulis && judul && deskripsi && tanggal && tags) {
            const dir = "public/images/artikels";
            ensureDir(dir); // Pastikan fungsi ensureDir ada atau gunakan fs.mkdirSync(dir, { recursive: true });
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, gambar_name), req.file.buffer);
        }

        const artikel = await Artikel.create({
            penulis,
            judul,
            slug: slugify(judul, { replacement: "-", lower: true }),
            deskripsi,
            tanggal,
            gambar: gambar_name,
        });

        if (tags) {
            const tagArray = tags
                .split(",")
                .map((tagId) => parseInt(tagId.trim()));
            const validTags = await Tag.findAll({ where: { id: tagArray } });

            if (validTags.length !== tagArray.length) {
                return res.status(400).json({ message: "Tag tidak ada" });
            }

            // Tambahkan tag ke artikel dengan menggunakan setTags
            await artikel.setTags(validTags);
        }

        // Ambil kembali artikel dengan relasi tags
        const artikelWithTags = await Artikel.findOne({
            where: { id: artikel.id },
            include: Tag, // Sertakan relasi tags
        });

        res.status(201).json({
            message: "Artikel Berhasil Ditambahkan!",
            data: artikelWithTags, // Kirim artikel dengan tags dalam response
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

// Read all
exports.findAll = async (req, res) => {
    try {
        const artikels = await Artikel.findAll({ include: Tag });
        res.status(200).json({
            message: "Artikel Berhasil Didapat!",
            data: artikels,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read one
exports.findOne = async (req, res) => {
    try {
        const artikel = await Artikel.findByPk(req.params.id, { include: Tag });
        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak ada!" });
        }
        res.status(200).json({
            message: "Artikel Berhasil Didapat!",
            data: artikel,
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
        const artikel = await Artikel.findOne({
            where: { slug: req.params.slug },
            include: Tag,
        });
        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak !" });
        }
        res.status(200).json({
            message: "Artikel Berhasil didapat!",
            data: artikel,
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
        const { penulis, judul, deskripsi, tanggal, tags } = req.body;
        const artikel = await Artikel.findByPk(req.params.id);

        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak ada!" });
        }

        let gambar_name = artikel.gambar;
        if (req.file) {
            const dir = "public/images/artikels";
            ensureDir(dir);
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, gambar_name), req.file.buffer);

            // Hapus gambar lama jika ada
            if (artikel.gambar) {
                const oldImagePath = path.join(dir, artikel.gambar);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        // Update artikel
        await artikel.update({
            penulis,
            judul,
            slug: slugify(judul, { replacement: "-", lower: true }),
            deskripsi,
            tanggal,
            gambar: gambar_name,
        });

        if (tags) {
            const tagArray = tags
                .split(",")
                .map((tagId) => parseInt(tagId.trim()));
            const validTags = await Tag.findAll({ where: { id: tagArray } });

            if (validTags.length !== tagArray.length) {
                return res.status(400).json({ message: "Tag tidak ada!" });
            }

            // Hapus semua tag lama dan tambahkan tag baru
            await artikel.setTags(validTags);
        }

        // Ambil kembali artikel dengan relasi tags
        const artikelWithTags = await Artikel.findOne({
            where: { id: artikel.id },
            include: Tag, // Sertakan relasi tags
        });

        res.status(200).json({
            message: "Artikel Berhasil Diupdate!",
            data: artikelWithTags,
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
        const artikel = await Artikel.findByPk(req.params.id);
        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak ada!" });
        }

        // Delete image file
        if (artikel.gambar) {
            const imagePath = path.resolve(
                `public/images/artikels/${artikel.gambar}`
            );
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }

        await ArtikelTag.destroy({ where: { artikelId: artikel.id } });
        await artikel.destroy();

        res.status(200).json({
            message: "Artikel Berhasil Dihapus!",
            data: artikel,
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
    const dir = "public/images/artikels";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};

exports.getArticleByTag = async (req, res) => {
    try {
        const tag = await Tag.findAll({
            where: { nama: req.query.tag },
            include: Artikel,
        });

        if (!tag) {
            return res.status(404).json({ message: "Tag artikel tidak !" });
        }
        res.status(200).json({
            message: "Artikel Berhasil Didapat!",
            data: tag,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
