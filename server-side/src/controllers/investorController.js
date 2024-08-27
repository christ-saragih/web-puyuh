const {
    Investor,
    InvestorBiodata,
    InvestorIdentitas,
    InvestorDataPendukung,
    InvestorAlamat,
    Transaksi,
} = require("../models");
const bcrypt = require("bcrypt");

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
                InvestorBiodata,
                InvestorIdentitas,
                InvestorDataPendukung,
                InvestorAlamat,
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
        const investor = await Investor.findByPk(req.investor.id);

        if (!investor) {
            return res.status(404).json({ message: "Investor tidak ada!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await investor.update({
            password: hashedPassword,
        });

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
        });
        res.status(200).json({
            message: "Data Transaksi!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
