const { Tag } = require("../models");
const fs = require("fs");
const path = require("path");

// Create
exports.create = async (req, res) => {
    try {
        const { nama } = req.body;

        const tag = await Tag.create({
            nama,
        });

        res.status(201).json({
            message: "Tag Berhasil ditambahkan!",
            data: tag,
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
        const tag = await Tag.findAll();
        res.status(200).json({
            message: "Tag berhasil diambil!",
            data: tag,
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
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Tag tidak ada!" });
        }
        res.status(200).json({
            message: "Tag berhasil diambil",
            data: tag,
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

        const tag = await Tag.findByPk(req.params.id);

        await tag.update({
            nama,
        });

        res.status(200).json({
            message: "Tag berhasil diperbaharui!",
            data: tag,
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
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Tag tidak ada!" });
        }

        await tag.destroy();
        res.status(200).json({
            message: "Tag berhasil dihapus",
            data: tag,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
