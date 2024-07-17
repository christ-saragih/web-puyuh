const { BerandaFrontpage } = require("../models");
const fs = require("fs");
const path = require("path");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const { nama_header, nama_subheader } = req.body;
        // console.log(req.body);

        // If validation passes, proceed to save the file
        const image_header = req.file ? req.file.buffer : null;
        let image_headerPath = null;

        if (image_header) {
            const dir = "public/image/berandaFrontpage";
            ensureDir(dir);
            image_headerPath = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(image_headerPath, image_header);
        }

        const beranda = await BerandaFrontpage.create({
            nama_header,
            nama_subheader,
            image_header: image_headerPath,
        });

        res.status(201).json({
            message: "Beranda Berhasil Ditambahkan!",
            data: beranda,
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

// Read All
exports.findAll = async (req, res) => {
    try {
        const berandas = await BerandaFrontpage.findAll();
        res.status(200).json({
            message: "BerandaFrontpage retrieved successfully",
            data: berandas,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read One
exports.findOne = async (req, res) => {
    try {
        const beranda = await BerandaFrontpage.findByPk(req.params.id);
        if (!beranda) {
            return res
                .status(404)
                .json({ message: "BerandaFrontpage not found" });
        }
        res.status(200).json({
            message: "BerandaFrontpage retrieved successfully",
            data: beranda,
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
        const { nama_header, nama_subheader } = req.body;
        const image_header = req.file ? req.file.path : null;

        const beranda = await BerandaFrontpage.findByPk(req.params.id);
        if (!beranda) {
            return res
                .status(404)
                .json({ message: "BerandaFrontpage not found" });
        }

        // Handle icon update
        let image_headerPath = beranda.image_header; // Default to current icon path
        if (req.file) {
            // If a new icon is uploaded, update it
            const dir = "public/image/berandaFrontpage";
            ensureDir(dir);
            image_headerPath = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            fs.writeFileSync(image_headerPath, req.file.buffer);

            // Delete old icon if exists
            if (beranda.image_header) {
                fs.unlinkSync(beranda.image_header);
            }
        }

        await beranda.update({
            nama_header,
            nama_subheader,
            image_header: image_headerPath,
        });

        res.status(200).json({
            message: "BerandaFrontpage updated successfully",
            data: beranda,
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
        const beranda = await BerandaFrontpage.findByPk(req.params.id);
        if (!beranda) {
            return res
                .status(404)
                .json({ message: "BerandaFrontpage not found" });
        }

        // Delete image file
        if (beranda.image_header) {
            fs.unlink(path.resolve(beranda.image_header), (err) => {
                if (err) console.error(err);
            });
        }

        await beranda.destroy();
        res.status(200).json({
            message: "BerandaFrontpage deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
