const { AdminBiodata } = require("../models");
const fs = require("fs");
const path = require("path");

// Create
exports.create = async (req, res) => {
    try {
        const {
            nama_lengkap,
            jk,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            kategori_investor,
        } = req.body;

        const adminId = req.admin.id;
        const adminBiodata = await AdminBiodata.create({
            adminId: adminId,
            nama_lengkap,
            jk,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            kategori_investor,
        });

        res.status(201).json({
            message: "Biodata Berhasil Ditambahkan!",
            data: adminBiodata,
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
        const AdminBiodata = await AdminBiodata.findAll();
        res.status(200).json({
            message: "Biodata Investor berhasil diambil!",
            data: AdminBiodata,
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
        const AdminBiodata = await AdminBiodata.findByPk(req.params.id);
        if (!AdminBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Investor tidak ada!" });
        }
        res.status(200).json({
            message: "Biodata Investor berhasil diambil",
            data: AdminBiodata,
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
        const {
            nama_lengkap,
            jk,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            kategori_investor,
        } = req.body;

        const AdminBiodata = await AdminBiodata.findByPk(req.params.id);
        if (!AdminBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Investor tidak ada!" });
        }

        await AdminBiodata.update(
            nama_lengkap,
            jk,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            kategori_investor
        );

        res.status(200).json({
            message: "Biodata Investor berhasil diperbaharui",
            data: AdminBiodata,
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
        const AdminBiodata = await AdminBiodata.findByPk(req.params.id);
        if (!AdminBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Investor tidak ada!" });
        }

        await AdminBiodata.destroy();
        res.status(200).json({
            message: "Biodata Investor berhasil dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
