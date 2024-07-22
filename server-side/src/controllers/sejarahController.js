const { Sejarah } = require("../models");
const fs = require("fs");
const path = require("path");

// Create
exports.create = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;

        const sejarah = await Sejarah.create({
            judul,
            deskripsi,
        });

        res.status(201).json({
            message: "Sejarah Berhasil Ditambahkan!",
            data: sejarah,
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
        const sejarah = await Sejarah.findAll();
        res.status(200).json({
            message: "Semua Data Sejarah",
            sejarah,
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
        const sejarah = await Sejarah.findByPk(req.params.id);
        if (!sejarah) {
            return res.status(404).json({ message: "Sejarah Tidak Ada!" });
        }
        res.status(200).json(sejarah);
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
        const { judul, deskripsi } = req.body;

        const sejarah = await Sejarah.findByPk(req.params.id);

        if (!sejarah) {
            return res.status(404).json({ message: "Sejarah Tidak Ada!" });
        }

        await sejarah.update({
            judul,
            deskripsi,
        });

        res.status(200).json({
            message: "Tentang Kami Berhasil Diupdate!",
            data: sejarah,
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
        const sejarah = await Sejarah.findByPk(req.params.id);
        if (!sejarah) {
            return res.status(404).json({ message: "Sejarah Tidak Ada!" });
        }

        await sejarah.destroy();

        res.status(200).json({
            message: "Tentang Kami Berhasil Dihapus!",
            data: sejarah,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
