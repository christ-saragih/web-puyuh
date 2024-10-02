const { BerandaFrontpage } = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const saveImage = (imageBuffer, originalName, dir) => {
    const imageName = `${Date.now()}-${originalName}`;
    fs.writeFileSync(path.join(dir, imageName), imageBuffer);
    return imageName;
};

const deleteOldImage = (imagePath) => {
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
};

// Upsert
exports.upsert = async (req, res) => {
    try {
        const { judul, subJudul } = req.body;
        const gambar = req.file ? req.file.buffer : null;
        const dir = "public/images/berandaFrontpage";

        let beranda = await BerandaFrontpage.findOne();

        if (!beranda) {
            let nama_gambar = null;

            if (gambar) {
                ensureDir(dir);
                nama_gambar = saveImage(gambar, req.file.originalname, dir);
            }

            beranda = await BerandaFrontpage.create({
                judul,
                subJudul,
                gambar: nama_gambar,
            });

            return res.status(201).json({
                message: "Beranda Berhasil Ditambahkan!",
                data: beranda,
            });
        } else {
            let nama_gambar = beranda.gambar;

            if (gambar) {
                ensureDir(dir);
                nama_gambar = saveImage(gambar, req.file.originalname, dir);
                deleteOldImage(path.join(dir, beranda.gambar));
            }

            await beranda.update({
                judul,
                subJudul,
                gambar: nama_gambar,
            });

            res.status(200).json({
                message: "Beranda berhasil diperbaharui!",
                data: beranda,
            });
        }
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const messages = error.errors.map((err) => err.message);
            return res.status(400).json({
                message: "Validation error",
                errors: messages,
            });
        }

        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read All
exports.findData = async (req, res) => {
    try {
        const beranda = await BerandaFrontpage.findOne();
        res.status(200).json({
            message: "Beranda berhasil diambil",
            data: beranda,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get Image by Name
exports.getImageByName = async (req, res) => {
    try {
        const { gambar } = req.params;

        // Cari data gambar di database
        const beranda = await BerandaFrontpage.findOne();
        if (!beranda) {
            return res.status(404).json({
                message: "Data beranda tidak ditemukan!",
            });
        }

        // Validasi apakah gambar yang diminta sama dengan yang ada di database
        if (gambar !== beranda.gambar) {
            return res.status(404).json({
                message: "Gambar tidak ditemukan!",
            });
        }

        const dir = "public/images/berandaFrontpage";
        const imagePath = path.join(dir, gambar);

        if (fs.existsSync(imagePath)) {
            res.sendFile(path.resolve(imagePath));
        } else {
            res.status(404).json({
                message: "Gambar tidak ditemukan!",
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
