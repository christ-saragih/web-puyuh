const { DokumenFrontpage } = require("../models");
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
        const { nama, status } = req.body;
        // If validation passes, proceed to save the file
        const file = req.file ? req.file.buffer : null;
        let file_path = null;

        if (file && nama && status) {
            const dir = "public/file/dokumenFrontpage";
            ensureDir(dir);
            file_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(file_path, file);
        }

        const dokumen = await DokumenFrontpage.create({
            nama,
            status,
            file: file_path,
        });

        res.status(201).json({
            message: "Dokumen Berhasil Ditambahkan!",
            data: dokumen,
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
        const dokumen = await DokumenFrontpage.findAll();
        res.status(200).json({
            message: "Dokumen berhasi diambil",
            data: dokumen,
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
        const dokumen = await DokumenFrontpage.findByPk(req.params.id);
        if (!dokumen) {
            return res.status(404).json({ message: "Dokumen tidak ada!" });
        }
        res.status(200).json({
            message: "Dokumen berhasi diambil",
            data: dokumen,
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
        const { nama, status } = req.body;
        const file = req.file ? req.file.path : null;

        const dokumen = await DokumenFrontpage.findByPk(req.params.id);
        if (!dokumen) {
            return res.status(404).json({ message: "Dokumen tidak ada!" });
        }

        // Handle icon update
        let file_path = dokumen.file; // Default to current icon path
        if (req.file) {
            // If a new icon is uploaded, update it
            const dir = "public/file/dokumenFrontpage";
            ensureDir(dir);
            file_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(file_path, req.file.buffer);

            // Delete old icon if exists
            if (dokumen.file) {
                fs.unlinkSync(dokumen.file);
            }
        }

        await dokumen.update({
            nama,
            status,
            file: file_path,
        });

        res.status(200).json({
            message: "Dokumen berhasil diperbaharui!",
            data: dokumen,
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
        const dokumen = await DokumenFrontpage.findByPk(req.params.id);
        if (!dokumen) {
            return res.status(404).json({ message: "Dokumen tidak ada!" });
        }

        // Delete image file
        if (dokumen.file) {
            fs.unlink(path.resolve(dokumen.file), (err) => {
                if (err) console.error(err);
            });
        }

        await dokumen.destroy();
        res.status(200).json({
            message: "Dokumen Berhasil Dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
