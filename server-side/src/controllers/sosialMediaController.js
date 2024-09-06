const { SosialMedia } = require("../models");
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
        const { nama, url } = req.body;
        const icon = req.file ? req.file.buffer : null;

        if (icon && nama && url) {
            const dir = "public/images/sosial-media/icon";
            ensureDir(dir);
            nama_icon = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, nama_icon), icon);
        }

        const sosialMedia = await SosialMedia.create({
            nama,
            icon: nama_icon,
            url,
        });

        res.status(201).json({
            message: "Sosial Media Berhasil ditambahkan!",
            data: sosialMedia,
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
        const sosialMedia = await SosialMedia.findAll();
        res.status(200).json({
            message: "Sosial media berhasil diambil!",
            data: sosialMedia,
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
        const sosialMedia = await SosialMedia.findByPk(req.params.id);
        if (!sosialMedia) {
            return res.status(404).json({ message: "Sosial Media tidak ada!" });
        }
        res.status(200).json({
            message: "Sosial media berhasil diambil",
            data: sosialMedia,
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
        const { nama, url } = req.body;
        const icon = req.file ? req.file.path : null;

        const sosialMedia = await SosialMedia.findByPk(req.params.id);
        if (!sosialMedia) {
            return res.status(404).json({ message: "Sosial Media tidak ada!" });
        }

        let nama_icon = sosialMedia.icon;
        if (req.file) {
            const dir = "public/images/sosial-media/icon";
            ensureDir(dir);
            nama_icon = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, nama_icon), req.file.buffer);

            if (sosialMedia.icon) {
                const oldImagePath = path.join(dir, sosialMedia.icon);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await sosialMedia.update({
            nama,
            icon: nama_icon,
            url,
        });

        res.status(200).json({
            message: "Sosial Media berhasil diperbaharui!",
            data: sosialMedia,
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
        const sosialMedia = await SosialMedia.findByPk(req.params.id);
        if (!sosialMedia) {
            return res.status(404).json({ message: "Sosial Media tidak ada!" });
        }

        // Delete image file
        if (sosialMedia.icon) {
            const imagePath = path.resolve(
                `public/images/sosial-media/icon/${sosialMedia.icon}`
            );
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error(err);
                });
            }
        }

        await sosialMedia.destroy();
        res.status(200).json({
            message: "Sosial Media berhasil dihapus",
            data: sosialMedia,
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
    const dir = "public/images/sosial-media/icon";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
