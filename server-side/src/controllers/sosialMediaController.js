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
        let icon_path = null;

        if (icon) {
            const dir = "public/images/sosial-media/icon";
            ensureDir(dir);
            icon_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(icon_path, icon);
        }

        const sosialMedia = await SosialMedia.create({
            nama,
            icon: icon_path,
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
        const icon = req.file ? req.file.buffer : null;

        const sosialMedia = await SosialMedia.findByPk(req.params.id);
        if (!sosialMedia) {
            return res.status(404).json({ message: "Sosial Media tidak ada" });
        }

        let icon_path = sosialMedia.icon;
        if (req.file) {
            const dir = "public/images/sosial-media/icon";
            ensureDir(dir);
            icon_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(icon_path, icon);

            if (sosialMedia.icon) {
                fs.unlinkSync(sosialMedia.icon);
            }
        }

        await sosialMedia.update({
            nama,
            icon: icon_path,
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
            fs.unlink(path.resolve(sosialMedia.icon), (err) => {
                if (err) console.error(err);
            });
        }

        await sosialMedia.destroy();
        res.status(200).json({
            message: "Sosial Media berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
