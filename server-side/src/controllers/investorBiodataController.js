const { InvestorBiodata } = require("../models");
const fs = require("fs");
const path = require("path");

// Create
// exports.create = async (req, res) => {
//     try {
//         const { nama_lengkap, alamat, email, no_phone } = req.body;
//         const kontak = await KontakFrontpage.create({
//             url_map,
//             alamat,
//             email,
//             no_phone,
//         });

//         res.status(201).json({
//             message: "Kontak Berhasil Ditambahkan!",
//             data: kontak,
//         });
//     } catch (error) {
//         if (error.name === "SequelizeValidationError") {
//             const messages = error.errors.map((err) => err.message);
//             res.status(400).json({
//                 message: "Validation error",
//                 errors: messages,
//             });
//         } else {
//             res.status(500).json({
//                 message: "Internal server error",
//                 error: error.message,
//             });
//         }
//     }
// };

// Read All
exports.findAll = async (req, res) => {
    try {
        const investorBiodata = await InvestorBiodata.findAll();
        res.status(200).json({
            message: "Biodata Investor berhasil diambil!",
            data: investorBiodata,
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
        const investorBiodata = await InvestorBiodata.findByPk(req.params.id);
        if (!investorBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Investor tidak ada!" });
        }
        res.status(200).json({
            message: "Biodata Investor berhasil diambil",
            data: investorBiodata,
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

        const investorBiodata = await InvestorBiodata.findByPk(req.params.id);
        if (!investorBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Investor tidak ada!" });
        }

        await investorBiodata.update(req.body);

        res.status(200).json({
            message: "Biodata Investor berhasil diperbaharui",
            data: investorBiodata,
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
        const investorBiodata = await InvestorBiodata.findByPk(req.params.id);
        if (!investorBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Investor tidak ada!" });
        }

        await investorBiodata.destroy();
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
