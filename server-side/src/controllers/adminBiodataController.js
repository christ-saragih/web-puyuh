const { AdminBiodata } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const { nama_lengkap, jk, tempat_lahir, tanggal_lahir, no_hp } =
            req.body;

        const foto_profil = req.file ? req.file.buffer : null;

        if (
            foto_profil &&
            nama_lengkap &&
            jk &&
            tempat_lahir &&
            tanggal_lahir &&
            no_hp
        ) {
            const dir = "public/images/admin/profile";
            ensureDir(dir);
            nama_foto = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, nama_foto), foto_profil);
        }

        const adminId = req.admin.id;
        const adminBiodata = await AdminBiodata.create({
            adminId: adminId,
            nama_lengkap,
            jk,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            foto_profil: nama_foto,
        });

        res.status(201).json({
            message: "Biodata Berhasil Ditambahkan!",
            data: adminBiodata,
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
        const AdminBiodata = await AdminBiodata.findAll();
        res.status(200).json({
            message: "Biodata Admin berhasil diambil!",
            data: AdminBiodata,
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
        const AdminBiodata = await AdminBiodata.findByPk(req.params.id);
        if (!AdminBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Admin tidak ada!" });
        }
        res.status(200).json({
            message: "Biodata Admin berhasil diambil",
            data: AdminBiodata,
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
        const { nama_lengkap, jk, tempat_lahir, tanggal_lahir, no_hp } =
            req.body;

        const foto_profil = req.file ? req.file.buffer : null;

        const adminBiodata = await AdminBiodata.findByPk(req.params.id);
        // console.log(adminBiodata.nama_lengkap);
        // exit();
        if (!adminBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Admin tidak ada!" });
        }

        let nama_foto = adminBiodata.foto_profil;
        if (foto_profil) {
            const dir = "public/images/admin/profile";
            ensureDir(dir);
            nama_foto = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, nama_foto), foto_profil);

            if (adminBiodata.foto_profil) {
                const oldImagePath = path.join(dir, adminBiodata.foto_profil);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await adminBiodata.update({
            nama_lengkap,
            jk,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            foto_profil: nama_foto,
        });

        res.status(200).json({
            message: "Biodata Admin berhasil diperbaharui",
            data: adminBiodata,
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
        const AdminBiodata = await AdminBiodata.findByPk(req.params.id);
        if (!AdminBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Admin tidak ada!" });
        }

        await AdminBiodata.destroy();
        res.status(200).json({
            message: "Biodata Admin berhasil dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
