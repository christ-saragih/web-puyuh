const {
    Investasi,
    Investor,
    InvestorBiodata,
    InvestorIdentitas,
    InvestorDataPendukung,
    InvestorAlamat,
    Transaksi,
} = require("../models");
const bcrypt = require("bcrypt");

const { sendNotification } = require("../services/notifikasiService");
// Read All
exports.findInvestorByAuth = async (req, res) => {
    try {
        const investors = await Investor.findOne({
            where: { id: req.user.id },
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

// Read All
exports.findAll = async (req, res) => {
    try {
        const investors = await Investor.findAll({
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

// Read One
exports.findOne = async (req, res) => {
    try {
        const investor = await Investor.findByPk(req.params.id, {
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
        if (!investor) {
            return res
                .status(404)
                .json({ message: "Data Investor tidak ada!" });
        }
        res.status(200).json({
            message: "Data Investor berhasil diambil",
            data: investor,
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
        const investor = await Investor.findByPk(req.user.id);

        if (!investor) {
            return res.status(404).json({ message: "Investor tidak ada!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await investor.update({
            password: hashedPassword,
        });

        const judul = "Password Berhasil Diubah";

        await sendNotification(investor.id, judul, investor.updatedAt);

        res.status(200).json({
            message: "Password berhasil diperbaharui!",
            data: investor,
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

// Get all transactions Investor
exports.getAllInvestorTransaction = async (req, res) => {
    try {
        const transaksi = await Transaksi.findAll({
            where: { investorId: req.user.id },
            include: {
                model: Investasi,
                as: "investasi",
            },
        });

        res.status(200).json({
            message: "Data Transaksi dan Investasi berhasil diambil!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getDetailInvestorTransaction = async (req, res) => {
    try {
        const { transaksiId } = req.params;

        const transaksi = await Transaksi.findOne({
            where: {
                id: transaksiId,
                investorId: req.user.id,
            },
            include: {
                model: Investasi,
                as: "investasi",
            },
        });

        if (!transaksi) {
            return res.status(404).json({
                message:
                    "Transaksi tidak ditemukan atau tidak berhak mengakses transaksi ini",
            });
        }

        res.status(200).json({
            message: "Detail Transaksi dan Investasi berhasil diambil!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getAllInvestorByInvestorKategori = async (req, res) => {
    try {
        const { kategori_investor } = req.query;
        const investor = await Investor.findAll({
            where: { kategori_investor },
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
            message: "Data Investor Berdasarkan Kategori Berhasil diambil!",
            data: investor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
