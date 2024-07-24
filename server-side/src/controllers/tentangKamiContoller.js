const { TentangKami } = require("../models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { exit } = require("process");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;
        const image_background = req.file ? req.file.buffer : null;

        if (image_background && judul && deskripsi) {
            const dir = "public/images/tentang-kami";
            ensureDir(dir);
            image_background_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(
                path.join(dir, image_background_name),
                image_background
            );
        }

        const tentangkami = await TentangKami.create({
            judul,
            deskripsi,
            image_background: image_background_name,
        });

        res.status(201).json({
            message: "Tentang Kami Berhasil Ditambahkan!",
            data: tentangkami,
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
        const tentangkami = await TentangKami.findAll();
        res.status(200).json({
            message: "Semua Data Tentang Kami",
            tentangkami,
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
        const tentangkami = await TentangKami.findByPk(req.params.id);
        if (!tentangkami) {
            return res.status(404).json({ message: "Tentang Kami Tidak Ada!" });
        }
        res.status(200).json(tentangkami);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update
// Update
exports.update = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;
        const image_background = req.file ? req.file.path : null;

        const tentangkami = await TentangKami.findByPk(req.params.id);
        if (!tentangkami) {
            return res.status(404).json({ message: "Tentang Kami Tidak Ada!" });
        }

        let image_background_name = tentangkami.image_background;
        if (req.file) {
            const dir = "public/images/tentang-kami";
            ensureDir(dir);
            image_background_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(
                path.join(dir, image_background_name),
                req.file.buffer
            );

            if (tentangkami.image_background) {
                const oldImagePath = path.join(
                    dir,
                    tentangkami.image_background
                );
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await tentangkami.update({
            judul,
            deskripsi,
            image_background: image_background_name,
        });

        res.status(200).json({
            message: "Tentang Kami Berhasil Diupdate!",
            data: tentangkami,
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
        const tentangkami = await TentangKami.findByPk(req.params.id);
        if (!tentangkami) {
            return res.status(404).json({ message: "Tentang Kami Tidak Ada!" });
        }

        // Delete image file
        if (tentangkami.image_background) {
            const imagePath = path.resolve(
                `public/images/tentang-kami/${tentangkami.image_background}`
            );
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error(err);
                });
            }
        }

        await tentangkami.destroy();

        res.status(200).json({
            message: "Tentang Kami Berhasil Dihapus!",
            data: tentangkami,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// New Function to Get Image by Name
exports.getImageByName = (req, res) => {
    const { gambar } = req.params;
    const dir = "public/images/tentang-kami";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
