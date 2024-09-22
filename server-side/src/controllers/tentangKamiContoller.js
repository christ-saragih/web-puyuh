const { TentangKami } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// upsert
exports.upsert = async (req, res) => {
    try {
        const tentangkami = await TentangKami.findOne();

        if (!tentangkami) {
            const { judul, deskripsi } = req.body;
            const image_background = req.file ? req.file.buffer : null;
            let nama_image_background = null;

            if (image_background && judul && deskripsi) {
                const dir = "public/images/tentang-kami";
                ensureDir(dir);
                nama_image_background = `${Date.now()}-${
                    req.file.originalname
                }`;
                fs.writeFileSync(
                    path.join(dir, nama_image_background),
                    image_background
                );
            }

            const tentangkami = await TentangKami.create({
                judul,
                deskripsi,
                image_background: nama_image_background,
            });

            res.status(201).json({
                message: "Tentang Kami Berhasil Ditambahkan!",
                data: tentangkami,
            });
        } else {
            const { judul, deskripsi } = req.body;
            const image_background = req.file ? req.file.buffer : null;

            let nama_image_background = tentangkami.image_background;
            if (image_background) {
                const dir = "public/images/tentang-kami";
                ensureDir(dir);
                nama_image_background = `${Date.now()}-${
                    req.file.originalname
                }`;
                fs.writeFileSync(
                    path.join(dir, nama_image_background),
                    image_background
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
                image_background: nama_image_background,
            });

            res.status(200).json({
                message: "Tentang Kami Berhasil Diupdate!",
                data: tentangkami,
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
        const tentangkami = await TentangKami.findOne();
        res.status(200).json({
            message: "Semua Data Tentang Kami",
            data: tentangkami,
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
