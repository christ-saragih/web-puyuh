const { validationResult } = require("express-validator");
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
        let gambar_path = null;

        if (gambar && nama && jabatan && deskripsi) {
            const dir = "public/images/founders";
            ensureDir(dir);
            gambar_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(gambar_path, gambar);
        }

        const founder = await Founder.create({
            nama,
            jabatan,
            deskripsi,
            gambar: gambar_path,
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
        res.status(200).json(founders);
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
        res.status(200).json(founder);
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
        const gambar = req.file ? req.file.path : null;

        const founder = await Founder.findByPk(req.params.id);
        if (!founder) {
            return res.status(404).json({ message: "Founder tidak ada!" });
        }

        let gambar_path = founder.gambar;
        if (req.file) {
            const dir = "public/images/founders";
            ensureDir(dir);
            gambar_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(gambar_path, req.file.buffer);

            if (founder.gambar) {
                fs.unlinkSync(founder.gambar);
            }
        }

        await founder.update({
            nama,
            jabatan,
            deskripsi,
            gambar: gambar_path,
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

        // Delete image file
        if (founder.gambar) {
            fs.unlink(path.resolve(founder.gambar), (err) => {
                if (err) console.error(err);
            });
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
