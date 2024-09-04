const { Admin, AdminBiodata, Investor, InvestorBiodata } = require("../models");
const bcrypt = require("bcrypt");

// Read All
exports.findAdminByAuth = async (req, res) => {
    try {
        const admins = await Admin.findOne({
            where: { id: req.user.id },
            include: AdminBiodata,
        });
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

exports.ubahPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const admin = await Admin.findByPk(req.admin.id);

        if (!admin) {
            return res.status(404).json({ message: "Admin tidak ada!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await admin.update({
            password: hashedPassword,
        });

        res.status(200).json({
            message: "Password berhasil diperbaharui!",
            data: admin,
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

// get Semua Data Investor
exports.GetAllDataInvestor = async (req, res) => {
    try {
        const investors = await Investor.findAll({ include: InvestorBiodata });
        res.status(200).json({
            message: "Data Admin berhasil diambil!",
            data: investors,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
