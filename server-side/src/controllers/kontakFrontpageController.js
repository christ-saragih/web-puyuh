const { KontakFrontpage } = require("../models");
const fs = require("fs");
const path = require("path");

// Create
exports.create = async (req, res) => {
    try {
        const { url_map, alamat, email, no_phone } = req.body;
        const kontak = await KontakFrontpage.create({
            url_map,
            alamat,
            email,
            no_phone,
        });

        res.status(201).json({
            message: "Kontak Berhasil Ditambahkan!",
            data: kontak,
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
        const kontak = await KontakFrontpage.findAll();
        res.status(200).json({
            message: "Kontak berhasil diambil!",
            data: kontak,
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
        const kontak = await KontakFrontpage.findByPk(req.params.id);
        if (!kontak) {
            return res.status(404).json({ message: "Kontak tidak ada!" });
        }
        res.status(200).json({
            message: "Kontak berhasil diambil",
            data: kontak,
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
        const { url_map, alamat, email, no_phone } = req.body;

        const kontak = await KontakFrontpage.findByPk(req.params.id);
        if (!kontak) {
            return res.status(404).json({ message: "Kontak tidak ada!" });
        }

        await kontak.update(req.body);

        res.status(200).json({
            message: "Kontak berhasil diperbaharui",
            data: kontak,
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
        const kontak = await KontakFrontpage.findByPk(req.params.id);
        if (!kontak) {
            return res.status(404).json({ message: "Kontak tidak ada!" });
        }

        await kontak.destroy();
        res.status(200).json({
            message: "Kontak berhasil dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};