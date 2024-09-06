const { BerandaFrontpage } = require("../models");
const fs = require("fs");
const path = require("path");

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
        const { nama_header, nama_subheader } = req.body;
        const image_header = req.file ? req.file.buffer : null;
        const dir = "public/images/berandaFrontpage";

        let beranda = await BerandaFrontpage.findOne();

        if (!beranda) {
            let nama_image_header = null;

            if (image_header) {
                ensureDir(dir);
                nama_image_header = saveImage(
                    image_header,
                    req.file.originalname,
                    dir
                );
            }

            beranda = await BerandaFrontpage.create({
                nama_header,
                nama_subheader,
                image_header: nama_image_header,
            });

            return res.status(201).json({
                message: "Beranda Berhasil Ditambahkan!",
                data: beranda,
            });
        } else {
            let nama_image_header = beranda.image_header;

            if (image_header) {
                ensureDir(dir);
                nama_image_header = saveImage(
                    image_header,
                    req.file.originalname,
                    dir
                );
                deleteOldImage(path.join(dir, beranda.image_header));
            }

            await beranda.update({
                nama_header,
                nama_subheader,
                image_header: nama_image_header,
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

// Delete
// exports.delete = async (req, res) => {
//     try {
//         const beranda = await BerandaFrontpage.findOne();

//         if (!beranda) {
//             return res.status(404).json({ message: "Beranda tidak ada!" });
//         }

//         const dir = "public/images/berandaFrontpage";

//         /// Hapus file gambar jika ada
//         if (beranda.image_header) {
//             const imagePath = path.join(dir, beranda.image_header);
//             deleteOldImage(imagePath);
//         }

//         await beranda.destroy();
//         res.status(200).json({
//             message: "Beranda Berhasil Dihapus!",
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// };

// Get Image by Name
exports.getImageByName = (req, res) => {
    const { gambar } = req.params;
    const dir = "public/images/berandaFrontpage";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};
