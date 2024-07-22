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
        let image_path = null;

        if (image && nama) {
            const dir = "public/images/dokumentasi";
            ensureDir(dir);
            image_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(image_path, image);
        }

        const dokumentasi = await DokumentasiFrontpage.create({
            nama,
            image: image_path,
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
        const image = req.file ? req.file.buffer : null;

        const dokumentasi = await DokumentasiFrontpage.findByPk(req.params.id);
        if (!dokumentasi) {
            return res.status(404).json({ message: "Dokumentasi tidak ada" });
        }

        let image_path = dokumentasi.image;
        if (req.file) {
            const dir = "public/images/dokumentasi";
            ensureDir(dir);
            image_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(image_path, image);

            if (dokumentasi.image) {
                fs.unlinkSync(dokumentasi.image);
            }
        }

        await dokumentasi.update({
            nama,
            image: image_path,
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
            fs.unlink(path.resolve(dokumentasi.image), (err) => {
                if (err) console.error(err);
            });
        }

        await dokumentasi.destroy();
        res.status(200).json({
            message: "Dokumentasi berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
