const { where } = require("sequelize");
const { Transaksi, Investasi } = require("../models");
const { exit } = require("process");

// Create a new transaction
exports.transaction = async (req, res) => {
    try {
        const { tanggal_transaksi, total_investasi, status } = req.body;

        investorId = req.investor.id;
        console.log(investorId);

        const investasi = await Investasi.findByPk(req.params.id);
        console.log(investasi.id);
        // exit();

        const transaksi = await Transaksi.create({
            investorId: investorId,
            investasiId: investasi.id,
            tanggal_transaksi,
            total_investasi,
            status,
        });

        console.log(total_investasi);
        total_pendanaan = (await investasi.total_pendanaan) + total_investasi;
        console.log(total_pendanaan);

        await investasi.update({
            total_pendanaan: total_pendanaan,
        });
        res.status(201).json({
            message: "Transaksi Berhasil!",
            data: transaksi,
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

// Get all transactions
exports.getAllTransaction = async (req, res) => {
    try {
        const transaksi = await Transaksi.findAll();
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

// Get all transactions by investasi Id
exports.getAllTransactionByInvestasiId = async (req, res) => {
    try {
        const { investasiId } = req.params;
        const transaksi = await Transaksi.findAll({
            where: { investasiId: investasiId },
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

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaksi = await Transaksi.findByPk(req.params.id);
        if (!transaksi) {
            return res.status(404).json({ message: "Transaksi tidak ada!" });
        }
        res.status(200).json({
            message: "Transaksi Berhasil Didapat!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    try {
        const transaksi = await Transaksi.findByPk(req.params.id);
        const {
            investorId,
            investasiId,
            tanggal_transaksi,
            total_investasi,
            status,
        } = req.body;

        await Transaksi.update({
            investorId,
            investasiId,
            tanggal_transaksi,
            total_investasi,
            status,
        });

        res.status(200).json({
            message: "Transaksi Berhasil!",
            data: transaksi,
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

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaksi = await Transaksi.findByPk(req.params.id);
        if (!transaksi) {
            return res.status(404).json({ message: "Transaksi tidak ada!" });
        }

        await transaksi.destroy();

        res.status(200).json({
            message: "Transaksi Berhasil Dihapus!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
