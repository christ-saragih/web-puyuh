const { Sejarah } = require("../models");

// Upsert
exports.upsert = async (req, res) => {
    try {
        const sejarah = await Sejarah.findOne();
        if (!sejarah) {
            const { judul, deskripsi } = req.body;

            const sejarah = await Sejarah.create({
                judul,
                deskripsi,
            });

            res.status(201).json({
                message: "Sejarah Berhasil Ditambahkan!",
                data: sejarah,
            });
        } else {
            const { judul, deskripsi } = req.body;

            await sejarah.update({
                judul,
                deskripsi,
            });

            res.status(200).json({
                message: "Tentang Kami Berhasil Diupdate!",
                data: sejarah,
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

// Read all
exports.findData = async (req, res) => {
    try {
        const sejarah = await Sejarah.findOne();
        res.status(200).json({
            message: "Semua Data Sejarah",
            data: sejarah,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
