const { validationResult } = require("express-validator");
const { Faq } = require("../models");

// Create Faq
exports.create = async (req, res) => {
    try {
        const { pertanyaan, jawaban, status } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const faq = await Faq.create({
            pertanyaan,
            jawaban,
            status,
        });

        res.status(201).json({
            message: "FAQ berhasil ditambahkan!",
            data: faq,
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

// Read all Faqs
exports.getAll = async (req, res) => {
    try {
        const faqs = await Faq.findAll();
        res.status(200).json({
            message: "FAQ berhasil Didapat!",
            data: faqs,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read one Faq
exports.getOne = async (req, res) => {
    try {
        const faq = await Faq.findByPk(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: "FAQ tidak ditemukan" });
        }
        res.status(200).json({
            message: "FAQ berhasil Didapat!",
            data: faq,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update Faq
exports.update = async (req, res) => {
    try {
        const { pertanyaan, jawaban, status } = req.body;

        const faq = await Faq.findByPk(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: "FAQ tidak ditemukan" });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await faq.update({ pertanyaan, jawaban, status });

        res.status(200).json({
            message: "FAQ berhasil diupdate!",
            data: faq,
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

// Delete Faq
exports.delete = async (req, res) => {
    try {
        const faq = await Faq.findByPk(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: "FAQ tidak ditemukan" });
        }

        await faq.destroy();

        res.status(200).json({ message: "FAQ berhasil dihapus!", data: faq });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
