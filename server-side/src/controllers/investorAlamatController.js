const { InvestorAlamat, Investor } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

// Create atau Update Data Investor Alamat
exports.upsert = async (req, res) => {
    try {
        const { alamat, provinsi, kota, kecamatan, kelurahan, kode_pos } =
            req.body;

        const investorAlamat = await InvestorAlamat.findOne({
            where: { investorId: req.user.id },
        });

        if (!investorAlamat) {
            const investorId = req.user.id;

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
        } else {
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
        }
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

// Get Data Investor Alamat Berdasarkan Id
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
