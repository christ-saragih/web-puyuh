const { TentangKami } = require("../models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

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
        let image_background_path = null;

        // const errors = validationResult(req.body);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        if (image_background && judul && deskripsi) {
            const dir = "public/images/tentang-kami";
            ensureDir(dir);
            image_background_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(image_background_path, image_background);
        }

        const tentangkami = await TentangKami.create({
            judul,
            deskripsi,
            image_background: image_background_path,
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
exports.update = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;
        const image_background = req.file ? req.file.path : null;

        const tentangkami = await TentangKami.findByPk(req.params.id);
        if (!tentangkami) {
            return res.status(404).json({ message: "Tentang Kami Tidak Ada!" });
        }

        let image_background_path = tentangkami.image_background;
        if (req.file) {
            const dir = "public/images/tentang-kami";
            ensureDir(dir);
            image_background_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(image_background_path, req.file.buffer);

            if (tentangkami.image_background) {
                fs.unlinkSync(tentangkami.image_background);
            }
        }

        await tentangkami.update({
            judul,
            deskripsi,
            image_background: image_background_path,
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
            fs.unlink(path.resolve(tentangkami.image_background), (err) => {
                if (err) console.error(err);
            });
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
