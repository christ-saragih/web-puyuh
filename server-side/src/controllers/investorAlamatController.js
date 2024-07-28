const { InvestorAlamat } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

// Create
exports.create = async (req, res) => {
    try {
        const { alamat, provinsi, kota, kecamatan, kelurahan, kode_pos } =
            req.body;
        const investorId = req.investor.id;
        // console.log(investorId);
        // exit();
        const investorAlamat = await InvestorAlamat.create({
            investorId: investorId,
            alamat,
            provinsi,
            kota,
            kecamatan,
            kelurahan,
            kode_pos,
        });

        res.status(201).json({
            message: "Alamat Investor Berhasil Ditambahkan!",
            data: investorAlamat,
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
        const investorAlamat = await InvestorAlamat.findAll();
        res.status(200).json({
            message: "Alamat Investor berhasil diambil!",
            data: investorAlamat,
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
        const investorAlamat = await InvestorAlamat.findByPk(req.params.id);
        if (!investorAlamat) {
            return res
                .status(404)
                .json({ message: "Alamat Investor tidak ada!" });
        }
        res.status(200).json({
            message: "Alamat Investor berhasil diambil",
            data: investorAlamat,
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
        const { alamat, provinsi, kota, kecamatan, kelurahan, kode_pos } =
            req.body;

        const investorAlamat = await InvestorAlamat.findByPk(req.params.id);
        if (!investorAlamat) {
            return res
                .status(404)
                .json({ message: "Alamat Investor tidak ada!" });
        }

        await investorAlamat.update({
            alamat,
            provinsi,
            kota,
            kecamatan,
            kelurahan,
            kode_pos,
        });

        res.status(200).json({
            message: "Alamat Investor berhasil diperbaharui",
            data: investorAlamat,
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
        const investorAlamat = await InvestorAlamat.findByPk(req.params.id);
        if (!investorAlamat) {
            return res
                .status(404)
                .json({ message: "Alamat Investor tidak ada!" });
        }

        await investorAlamat.destroy();
        res.status(200).json({
            message: "Alamat Investor berhasil dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
