const { where } = require("sequelize");
const {
    Transaksi,
    Investasi,
    Investor,
    InvestorBiodata,
} = require("../models");
const midtransClient = require("midtrans-client");
const { exit } = require("process");

require("dotenv").config();

// Create Snap API instance
let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-jNWdhi65sWMf72czjX-CLx9S",
    // serverKey: process.env.MIDTRANS_SERVER,
});

// Create a new transaction
exports.transaction = async (req, res) => {
    try {
        const { total_investasi } = req.body;

        const investor = await Investor.findOne({
            where: { id: req.user.id },
            attributes: ["id", "email", "isVerifiedProfile"],
            include: {
                model: InvestorBiodata,
                as: "investorBiodata",
                attributes: ["id", "nama_lengkap", "no_hp"],
            },
        });
        // console.log(
        //     `name: ${investor.investorBiodata.nama_lengkap}`,
        //     `email: ${investor.email}`,
        //     `phone: ${investor.investorBiodata.no_hp}`
        // );
        // exit();

        const investasi = await Investasi.findByPk(req.params.id);
        // console.log(investor.isVerifiedProfile == true);

        if (investor.isVerifiedProfile != true) {
            return res.status(403).json({
                message: "Akun anda belum terverifikasi!",
            });
        }

        // exit();

        const transaksi = await Transaksi.create({
            investorId: req.user.id,
            investasiId: investasi.id,
            tanggal_transaksi: new Date(),
            total_investasi,
            status: "proses",
        });

        console.log(total_investasi);
        const total_pendanaan = investasi.total_pendanaan + total_investasi;
        console.log(total_pendanaan);

        await investasi.update({
            total_pendanaan: total_pendanaan,
        });

        let itemName =
            investasi.judul.length > 50
                ? investasi.judul.substring(0, 50)
                : investasi.judul;

        let parameter = {
            transaction_details: {
                order_id: transaksi.id,
                gross_amount: total_investasi,
            },
            credit_card: {
                secure: true,
            },
            item_details: [
                {
                    id: investasi.id,
                    name: itemName,
                    price: total_investasi,
                    quantity: 1,
                },
            ],
            customer_details: {
                name: investor.investorBiodata.nama_lengkap,
                email: investor.email,
                phone: investor.investorBiodata.no_hp,
            },
        };

        const token = await snap.createTransaction(parameter);

        res.status(201).json({
            message: "Transaksi Berhasil!",
            data: transaksi,
            token,
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

exports.callbackPayment = async (req, res) => {
    const statusResponse = await snap.transaction.notification(req.body);
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    const transaksiData = await Transaksi.findByPk(orderId);

    if (!transaksiData) {
        res.status(404);
        throw new Error("Transaksi tidak ditemukan");
    }
    // Sample transactionStatus handling logic

    if (transactionStatus == "capture" || transactionStatus == "settlement") {
        if (fraudStatus == "accept") {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
            const transaksiInvestasi = transaksiData.itemsDetail;

            for (const itemTransaksi of transaksiInvestasi) {
                const investasiData = await Investasi.findByPk(
                    itemTransaksi.investasi
                );

                if (!investasiData) {
                    res.status(404);
                    throw new Error("Transaksi tidak ditemukan");
                }

                transaksiData.total_pendanaan =
                    transaksiData.total_pendanaan + itemTransaksi.price;

                await transaksiData.save();
            }

            transaksiData.status = "berhasil";
        }
    } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
    ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        transaksiData.status = "gagal";
    } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK

        transaksiData.status = "proses";
    }

    await transaksiData.save();

    return res.status(200).send("payment notif berhasil");
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

// Get all transactions by investor Id
exports.getAllTransactionByInvestorId = async (req, res) => {
    try {
        const { investorId } = req.params;
        const transaksi = await Transaksi.findAll({
            where: { investorId: investorId },
            include: [
                {
                    model: Investor,
                    as: "investor",
                    attributes: ["id"],
                    include: {
                        model: InvestorBiodata,
                        as: "investorBiodata",
                        attributes: ["nama_lengkap"],
                    },
                },
                {
                    model: Investasi,
                    as: "investasi",
                },
            ],
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
