const { Investasi } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

// Create
exports.create = async (req, res) => {
    try {
        const {
            judul,
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        } = req.body;
        const adminId = req.admin.id;

        const investasi = await Investasi.create({
            adminId: adminId,
            judul,
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        });

        res.status(201).json({
            message: "Data  Berhasil Ditambahkan!",
            data: investasi,
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
        const investasi = await Investasi.findAll();
        res.status(200).json({
            message: "Data  berhasil diambil!",
            data: investasi,
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
        const investasi = await Investasi.findByPk(req.params.id);
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }
        res.status(200).json({
            message: "Data  berhasil diambil",
            data: investasi,
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
            judul,
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        } = req.body;

        const investasi = await Investasi.findByPk(req.params.id);
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }

        await investasi.update({
            judul,
            penerbit,
            penggunaan_dana,
            jaminan_kebendaan,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            satuan_perdagangan,
            minimum_pendanaan,
            maksimum_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status,
        });

        res.status(200).json({
            message: "Data  berhasil diperbaharui",
            data: investasi,
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
        const investasi = await Investasi.findByPk(req.params.id);
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }

        await investasi.destroy();
        res.status(200).json({
            message: "Data  berhasil dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
