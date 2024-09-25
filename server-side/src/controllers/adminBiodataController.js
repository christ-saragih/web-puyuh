const { AdminBiodata, Admin } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create atau Update Admin Biodata
exports.upsert = async (req, res) => {
    try {
        const { nama_lengkap, jk, tempat_lahir, tanggal_lahir, no_hp, email } =
            req.body;

        const adminBiodata = await AdminBiodata.findOne({
            where: { adminId: req.user.id },
        });

        const admin = await Admin.findByPk(req.user.id);

        // console.log(admin);
        // exit();

        const foto_profil = req.file ? req.file.buffer : null;

        if (!adminBiodata) {
            nama_foto = null;
            if (
                foto_profil &&
                nama_lengkap &&
                jk &&
                tempat_lahir &&
                tanggal_lahir &&
                no_hp
            ) {
                const dir = "public/images/admins/profile";
                ensureDir(dir);
                nama_foto = `${Date.now()}-${req.file.originalname}`;
                fs.writeFileSync(path.join(dir, nama_foto), foto_profil);
            }

            const adminId = req.user.id;
            const adminBiodata = await AdminBiodata.create({
                adminId: adminId,
                nama_lengkap,
                jk,
                tempat_lahir,
                tanggal_lahir,
                no_hp,
                foto_profil: nama_foto,
            });

            await admin.update({
                email,
            });

            const bioAdmin = await AdminBiodata.findOne({
                where: { id: adminBiodata.id },
                include: {
                    model: Admin,
                    as: "admin",
                },
            });

            res.status(201).json({
                message: "Biodata Berhasil Ditambahkan!",
                data: bioAdmin,
            });
        } else {
            let nama_foto = adminBiodata.foto_profil;
            if (foto_profil) {
                const dir = "public/images/admins/profile";
                ensureDir(dir);
                nama_foto = `${Date.now()}-${req.file.originalname}`;
                fs.writeFileSync(path.join(dir, nama_foto), foto_profil);

                if (adminBiodata.foto_profil) {
                    const oldImagePath = path.join(
                        dir,
                        adminBiodata.foto_profil
                    );
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

            await admin.update({
                email,
            });

            const bioAdmin = await AdminBiodata.findOne({
                where: { id: adminBiodata.id },
                include: {
                    model: Admin,
                    as: "admin",
                },
            });

            res.status(200).json({
                message: "Biodata Admin berhasil diperbaharui",
                data: bioAdmin,
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

// Get Data  Admin Berdasarkan Id
exports.findOne = async (req, res) => {
    try {
        const adminBiodata = await AdminBiodata.findOne({
            where: { id: req.params.id },
            include: {
                model: Admin,
                as: "admin",
            },
        });
        if (!adminBiodata) {
            return res
                .status(404)
                .json({ message: "Biodata Admin tidak ada!" });
        }
        res.status(200).json({
            message: "Biodata Admin berhasil diambil",
            data: adminBiodata,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get Gambar Profile Berdasarkan Nama Gambar
exports.getImageByName = (req, res) => {
    const { gambar } = req.params;
    const dir = "public/images/admins/profile";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
