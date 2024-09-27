const { Notifikasi } = require("../models");

// Create
exports.create = async (req, res) => {
    try {
        const { judul, tanggal } = req.body;
        console.log("asadada");

        const notifikasi = await Notifikasi.create({
            judul,
            tanggal,
        });

        res.status(201).json({
            message: "Notifikasi Berhasil ditambahkan!",
            data: notifikasi,
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
        const notifikasi = await Notifikasi.findAll();
        res.status(200).json({
            message: "Notifikasi berhasil diambil!",
            data: notifikasi,
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
        const notifikasi = await Notifikasi.findByPk(req.params.id);
        if (!notifikasi) {
            return res.status(404).json({ message: "Notifikasi tidak ada!" });
        }
        res.status(200).json({
            message: "Notifikasi berhasil diambil",
            data: notifikasi,
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
        const { judul, tanggal } = req.body;

        const notifikasi = await Notifikasi.findByPk(req.params.id);

        await notifikasi.update({
            judul,
            tanggal,
        });

        res.status(200).json({
            message: "Notifikasi berhasil diperbaharui!",
            data: notifikasi,
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
        const notifikasi = await Notifikasi.findByPk(req.params.id);
        if (!notifikasi) {
            return res.status(404).json({ message: "Notifikasi tidak ada!" });
        }

        await notifikasi.destroy();
        res.status(200).json({
            message: "Notifikasi berhasil dihapus",
            data: notifikasi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
