const { Admin, AdminBiodata } = require("../models");
const fs = require("fs");
const path = require("path");

// Read All
exports.findAll = async (req, res) => {
    try {
        const admins = await Admin.findAll({ include: AdminBiodata });
        res.status(200).json({
            message: "Data Admin berhasil diambil!",
            data: admins,
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
        const admin = await Admin.findByPk(req.params.id, {
            include: AdminBiodata,
        });
        if (!admin) {
            return res.status(404).json({ message: "Data Admin tidak ada!" });
        }
        res.status(200).json({
            message: "Data Admin berhasil diambil",
            data: admin,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
