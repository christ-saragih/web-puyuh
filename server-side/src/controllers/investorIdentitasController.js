const { InvestorIdentitas, Investor } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create atau Update Data Investor Indentitas
exports.upsert = async (req, res) => {
    try {
        const { no_ktp, no_npwp } = req.body;

        const investorIdentitas = await InvestorIdentitas.findOne({
            where: { investorId: req.user.id },
        });

        const foto_ktp =
            req.files && req.files.foto_ktp
                ? req.files.foto_ktp[0].buffer
                : null;

        const foto_npwp =
            req.files && req.files.foto_npwp
                ? req.files.foto_npwp[0].buffer
                : null;
        const selfie_ktp =
            req.files && req.files.selfie_ktp
                ? req.files.selfie_ktp[0].buffer
                : null;

        if (!investorIdentitas) {
            if (!no_ktp && !no_npwp) {
                return res.status(400).json({
                    message: "Nomor KTP dan NPWP data harus terisi!",
                });
            }

            if (req.files && req.files.foto_ktp) {
                const dir_fotoKtp = "public/images/dataIdentitas/foto_ktp";
                ensureDir(dir_fotoKtp);
                const foto_ktp = req.files.foto_ktp[0].buffer;
                nama_foto_ktp = `foto_ktp-${Date.now()}-${
                    req.files.foto_ktp[0].originalname
                }`;
                fs.writeFileSync(
                    path.join(dir_fotoKtp, nama_foto_ktp),
                    foto_ktp
                );
            }

            if (req.files && req.files.foto_npwp) {
                const dir_fotoNpwp = "public/images/dataIdentitas/foto_npwp";
                ensureDir(dir_fotoNpwp);
                const foto_npwp = req.files.foto_npwp[0].buffer;
                nama_foto_npwp = `foto_npwp-${Date.now()}-${
                    req.files.foto_npwp[0].originalname
                }`;
                fs.writeFileSync(
                    path.join(dir_fotoNpwp, nama_foto_npwp),
                    foto_npwp
                );
            }

            if (req.files && req.files.selfie_ktp) {
                const dir_selfieKtp = "public/images/dataIdentitas/selfie_ktp";
                ensureDir(dir_selfieKtp);
                const selfie_ktp = req.files.selfie_ktp[0].buffer;
                nama_selfie_ktp = `selfie_ktp-${Date.now()}-${
                    req.files.selfie_ktp[0].originalname
                }`;
                fs.writeFileSync(
                    path.join(dir_selfieKtp, nama_selfie_ktp),
                    selfie_ktp
                );
            }

            const investorId = req.user.id;
            const investorIdentitas = await InvestorIdentitas.create({
                investorId,
                no_ktp,
                foto_ktp: nama_foto_ktp,
                no_npwp,
                foto_npwp: nama_foto_npwp,
                selfie_ktp: nama_selfie_ktp,
            });

            res.status(201).json({
                message: "Identitas Investor Berhasil Ditambahkan!",
                data: investorIdentitas,
            });
        } else {
            let nama_foto_ktp = investorIdentitas.foto_ktp;
            let nama_foto_npwp = investorIdentitas.foto_npwp;
            let nama_selfie_ktp = investorIdentitas.selfie_ktp;
            if (foto_ktp) {
                const dir_fotoKtp = "public/images/dataIdentitas/foto_ktp";
                ensureDir(dir_fotoKtp);
                const foto_ktp = req.files.foto_ktp[0].buffer;
                nama_foto_ktp = `foto_ktp-${Date.now()}-${
                    req.files.foto_ktp[0].originalname
                }`;
                fs.writeFileSync(
                    path.join(dir_fotoKtp, nama_foto_ktp),
                    foto_ktp
                );

                // Delete old image file
                if (investorIdentitas.foto_ktp) {
                    const oldFotoKtpPath = path.join(
                        dir_fotoKtp,
                        investorIdentitas.foto_ktp
                    );
                    if (fs.existsSync(oldFotoKtpPath)) {
                        fs.unlinkSync(oldFotoKtpPath);
                    }
                }
            }

            if (foto_npwp) {
                const dir_fotoNpwp = "public/images/dataIdentitas/foto_npwp";
                ensureDir(dir_fotoNpwp);
                const foto_npwp = req.files.foto_npwp[0].buffer;
                nama_foto_npwp = `foto_npwp-${Date.now()}-${
                    req.files.foto_npwp[0].originalname
                }`;
                fs.writeFileSync(
                    path.join(dir_fotoNpwp, nama_foto_npwp),
                    foto_npwp
                );

                // Delete old image file
                if (investorIdentitas.foto_npwp) {
                    const oldFotoNpwpPath = path.join(
                        dir_fotoNpwp,
                        investorIdentitas.foto_npwp
                    );
                    if (fs.existsSync(oldFotoNpwpPath)) {
                        fs.unlinkSync(oldFotoNpwpPath);
                    }
                }
            }

            if (selfie_ktp) {
                const dir_selfieKtp = "public/images/dataIdentitas/selfie_ktp";
                ensureDir(dir_selfieKtp);
                const selfie_ktp = req.files.selfie_ktp[0].buffer;
                nama_selfie_ktp = `selfie_ktp-${Date.now()}-${
                    req.files.selfie_ktp[0].originalname
                }`;
                fs.writeFileSync(
                    path.join(dir_selfieKtp, nama_selfie_ktp),
                    selfie_ktp
                );

                // Delete old image file
                if (investorIdentitas.selfie_ktp) {
                    const oldSelfieKtpPath = path.join(
                        dir_selfieKtp,
                        investorIdentitas.selfie_ktp
                    );
                    if (fs.existsSync(oldSelfieKtpPath)) {
                        fs.unlinkSync(oldSelfieKtpPath);
                    }
                }
            }

            await investorIdentitas.update({
                no_ktp,
                foto_ktp: nama_foto_ktp,
                no_npwp,
                foto_npwp: nama_foto_npwp,
                selfie_ktp: nama_selfie_ktp,
            });

            res.status(200).json({
                message: "Identitas Investor berhasil diperbaharui",
                data: investorIdentitas,
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

// Get Data Investor Identitas Berdasarkan ID
exports.findOne = async (req, res) => {
    try {
        const investorIdentitas = await InvestorIdentitas.findByPk(
            req.params.id
        );
        if (!investorIdentitas) {
            return res
                .status(404)
                .json({ message: "Identitas Investor tidak ada!" });
        }
        res.status(200).json({
            message: "Identitas Investor berhasil diambil",
            data: investorIdentitas,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get Data Gambar Identitas Investor Identitas Berdasarkan Nama Gambar
exports.getImageByName = (req, res) => {
    const { imageName } = req.params;
    const dir_fotoKtp = "public/images/dataIdentitas/foto_ktp";
    const dir_fotoNpwp = "public/images/dataIdentitas/foto_npwp";
    const dir_selfieKtp = "public/images/dataIdentitas/selfie_ktp";

    let imagePath;

    if (imageName.startsWith("foto_ktp")) {
        imagePath = path.join(dir_fotoKtp, imageName);
    } else if (imageName.startsWith("foto_npwp")) {
        imagePath = path.join(dir_fotoNpwp, imageName);
    } else if (imageName.startsWith("selfie_ktp")) {
        imagePath = path.join(dir_selfieKtp, imageName);
    } else {
        return res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
