const { InvestorBiodata, Investor } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const { where } = require("sequelize");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create atau Update Investor Biodata
exports.upsert = async (req, res) => {
    try {
        const {
            nama_lengkap,
            jk,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            kategori_investor,
            email,
        } = req.body;

        const investorBiodata = await InvestorBiodata.findOne({
            where: { investorId: req.user.id },
        });

        console.log(investorBiodata);
        // exit();

        const investor = await Investor.findOne({
            where: { id: req.user.id },
        });
        // console.log(investor);
        // exit();

        const foto_profil = req.file ? req.file.buffer : null;

        if (!investorBiodata) {
            nama_foto = null;

            if (foto_profil) {
                const dir = "public/images/investors/profile";
                ensureDir(dir);
                nama_foto = `${Date.now()}-${req.file.originalname}`;
                fs.writeFileSync(path.join(dir, nama_foto), foto_profil);
            }

            const investorId = req.user.id;
            const investorBiodata = await InvestorBiodata.create({
                investorId: investorId,
                nama_lengkap,
                jk,
                tempat_lahir,
                tanggal_lahir,
                no_hp,
                foto_profil: nama_foto,
            });

            await investor.update({
                kategori_investor,
                email,
            });

            const bioInvestor = await InvestorBiodata.findOne({
                where: { id: investorBiodata.id },
                include: {
                    model: Investor,
                    as: "investor",
                },
            });

            res.status(201).json({
                message: "Biodata Berhasil Ditambahkan!",
                data: bioInvestor,
            });
        } else {
            let nama_foto = investorBiodata.foto_profil;
            if (foto_profil) {
                const dir = "public/images/investors/profile";
                ensureDir(dir);
                nama_foto = `${Date.now()}-${req.file.originalname}`;
                fs.writeFileSync(path.join(dir, nama_foto), foto_profil);

                if (investorBiodata.foto_profil) {
                    const oldImagePath = path.join(
                        dir,
                        investorBiodata.foto_profil
                    );
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            }

            await investorBiodata.update({
                nama_lengkap,
                jk,
                tempat_lahir,
                tanggal_lahir,
                no_hp,
                foto_profil: nama_foto,
            });

            await investor.update({
                kategori_investor,
                email,
            });

            const bioInvestor = await InvestorBiodata.findOne({
                where: { id: investorBiodata.id },
                include: {
                    model: Investor,
                    as: "investor",
                },
            });

            res.status(200).json({
                message: "Biodata investor berhasil diperbaharui",
                data: bioInvestor,
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

// Read One
exports.findOne = async (req, res) => {
    try {
        const investorBiodata = await InvestorBiodata.findOne({
            where: { id: req.params.id },
            include: {
                model: Investor,
                as: "investor",
            },
        });
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

// Get Image by Name
exports.getImageByName = (req, res) => {
    const { gambar } = req.params;
    const dir = "public/images/investors/profile";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
