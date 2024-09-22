const { InvestorDataPendukung } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

// Create atau Update Data Investor Data Pendukung
exports.upsert = async (req, res) => {
    try {
        const {
            latar_pendidikan,
            sumber_penghasilan,
            jumlah_penghasilan,
            bidang_usaha,
            tujuan_investasi,
            no_sid,
            tanggal_pembuatan_sid,
        } = req.body;

        const investorDataPendukung = await InvestorDataPendukung.findOne({
            where: { investorId: req.user.id },
        });

        if (!investorDataPendukung) {
            const investorId = req.user.id;
            const investorDataPendukung = await InvestorDataPendukung.create({
                investorId: investorId,
                latar_pendidikan,
                sumber_penghasilan,
                jumlah_penghasilan,
                bidang_usaha,
                tujuan_investasi,
                no_sid,
                tanggal_pembuatan_sid,
            });

            res.status(201).json({
                message: "Data Pendukung Investor Berhasil Ditambahkan!",
                data: investorDataPendukung,
            });
        } else {
            await investorDataPendukung.update({
                latar_pendidikan,
                sumber_penghasilan,
                jumlah_penghasilan,
                bidang_usaha,
                tujuan_investasi,
                no_sid,
                tanggal_pembuatan_sid,
            });

            res.status(200).json({
                message: "Data Pendukung Investor berhasil diperbaharui",
                data: investorDataPendukung,
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

// Get Data Pendukung Investor Berdasarkan Id
exports.findOne = async (req, res) => {
    try {
        const investorDataPendukung = await InvestorDataPendukung.findByPk(
            req.params.id
        );
        if (!investorDataPendukung) {
            return res
                .status(404)
                .json({ message: "Data Pendukung Investor tidak ada!" });
        }
        res.status(200).json({
            message: "Data Pendukung Investor berhasil diambil",
            data: investorDataPendukung,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
