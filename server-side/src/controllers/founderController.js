const { Founder } = require("../models");
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
        const { nama, jabatan, deskripsi } = req.body;

        const gambar = req.file ? req.file.buffer : null;
        let nama_gambar = null;

        if (gambar && nama && jabatan && deskripsi) {
            const dir = "public/images/founders";
            ensureDir(dir);
            nama_gambar = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, nama_gambar), gambar);
        }

        const founder = await Founder.create({
            nama,
            jabatan,
            deskripsi,
            gambar: nama_gambar,
        });

        res.status(201).json({
            message: "Founder Berhasil Ditambahkan!",
            data: founder,
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

// Read all
exports.findAll = async (req, res) => {
    try {
        const founders = await Founder.findAll();
        res.status(200).json({
            message: "Semua data founder berhasil didapat!",
            data: founders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read one
exports.findOne = async (req, res) => {
    try {
        const founder = await Founder.findByPk(req.params.id);
        if (!founder) {
            return res.status(404).json({ message: "Founder tidak ada!" });
        }
        res.status(200).json({
            message: "Data founder berhasil didapat!",
            data: founder,
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
        const { nama, jabatan, deskripsi } = req.body;
        const gambar = req.file ? req.file.buffer : null;

        const founder = await Founder.findByPk(req.params.id);
        if (!founder) {
            return res.status(404).json({ message: "Founder tidak ada!" });
        }

        let nama_gambar = founder.gambar;
        if (gambar) {
            const dir = "public/images/founders";
            ensureDir(dir);
            nama_gambar = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, nama_gambar), gambar);

            if (founder.gambar) {
                const oldImagePath = path.join(dir, founder.gambar);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await founder.update({
            nama,
            jabatan,
            deskripsi,
            gambar: nama_gambar,
        });

        res.status(200).json({
            message: "Founder Berhasil Diupdate!",
            data: founder,
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
        const founder = await Founder.findByPk(req.params.id);
        if (!founder) {
            return res.status(404).json({ message: "Founder tidak ada!" });
        }

        // Hapus Gambar
        if (founder.gambar) {
            const imagePath = path.resolve(
                `public/images/founders/${founder.gambar}`
            );
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }

        await founder.destroy();

        res.status(200).json({
            message: "Founder Berhasil Dihapus!",
            data: founder,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getImageByName = (req, res) => {
    const { gambar } = req.params;
    const dir = "public/images/founders";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
