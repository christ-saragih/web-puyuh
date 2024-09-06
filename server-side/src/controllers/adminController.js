const { where } = require("sequelize");
const {
    Admin,
    AdminBiodata,
    Investor,
    InvestorBiodata,
    InvestorIdentitas,
    InvestorDataPendukung,
    InvestorAlamat,
} = require("../models");
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

// Dapatkan Semua Data Investor
exports.getAllDataInvestor = async (req, res) => {
    try {
        const investors = await Investor.findAll({
            attributes: ["id", "kategori_investor"],
            include: [
                {
                    model: InvestorBiodata,
                    as: "investorBiodata",
                    attributes: ["nama_lengkap", "foto_profil"],
                },
            ],
        });
        res.status(200).json({
            message: "Data Investor berhasil diambil!",
            data: investors,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Dapatkan Detail Data Investor
exports.getDetailDataInvestor = async (req, res) => {
    try {
        const investors = await Investor.findAll({
            where: { id: req.params.id },
            include: [
                {
                    model: InvestorBiodata,
                    as: "investorBiodata",
                },
                {
                    model: InvestorIdentitas,
                    as: "investorIdentitas",
                },
                {
                    model: InvestorDataPendukung,
                    as: "investorDataPendukung",
                },
                {
                    model: InvestorAlamat,
                    as: "investorAlamat",
                },
            ],
        });
        res.status(200).json({
            message: "Data Investor berhasil diambil!",
            data: investors,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Ubah Password Admin
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
