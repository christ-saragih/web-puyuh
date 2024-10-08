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
const { sendNotification } = require("../services/notifikasiService");
const { exit } = require("process");

// Read All
exports.findAdminByAuth = async (req, res) => {
    try {
        const admins = await Admin.findOne({
            where: { id: req.user.id },
            include: {
                model: AdminBiodata,
                as: "adminBiodata",
            },
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
            attributes: ["id", "username", "kategori_investor"],
            include: [
                {
                    model: InvestorBiodata,
                    as: "investorBiodata",
                    attributes: ["foto_profil"],
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
        const investors = await Investor.findOne({
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
        const admin = await Admin.findByPk(req.user.id);

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

// Reject Verifikasi profile
exports.rejectVerifiedProfile = async (req, res) => {
    try {
        const { pesan } = req.body;

        const investor = await Investor.findByPk(req.params.id);

        await sendNotification(investor.id, pesan, new Date());

        res.status(200).json({
            message: "Verifikasi Akun Ditolak!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Verifikasi profile
exports.verifiedProfile = async (req, res) => {
    try {
        const investor = await Investor.findByPk(req.params.id);

        const investorBiodata = await InvestorBiodata.findOne({
            where: { investorId: investor.id },
        });
        const investorAlamat = await InvestorAlamat.findOne({
            where: { investorId: investor.id },
        });
        const investorDataPendukung = await InvestorDataPendukung.findOne({
            where: { investorId: investor.id },
        });
        const investorIdentitas = await InvestorIdentitas.findOne({
            where: { investorId: investor.id },
        });

        if (
            !investorBiodata ||
            !investorAlamat ||
            !investorDataPendukung ||
            !investorIdentitas
        ) {
            return res.status(400).json({
                message: "Data Investor Belum Lengkap!",
            });
        }
        // exit();

        await investor.update({
            isVerifiedProfile: true,
        });

        await sendNotification(
            investor.id,
            "Akun Anda Telah Diverifikasi!",
            new Date()
        );

        res.status(200).json({
            message: "Akun Telah diverifikasi!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
