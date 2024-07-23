const { Artikel, Tag, ArtikelTag } = require("../models");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const { penulis, judul, deskripsi, tanggal, tags } = req.body;
        const gambar = req.file ? req.file.buffer : null;
        let gambar_path = null;

        if (gambar && penulis && judul && deskripsi && tanggal && tags) {
            const dir = "public/images/artikel";
            ensureDir(dir);
            gambar_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(gambar_path, gambar);
        }

        const artikel = await Artikel.create({
            penulis,
            judul,
            slug: slugify(judul, { replacement: "-", lower: true }),
            deskripsi,
            tanggal,
            gambar: gambar_name,
        });

        if (tags) {
            const tagArray = tags
                .split(",")
                .map((tagId) => parseInt(tagId.trim()));
            const validTags = await Tag.findAll({ where: { id: tagArray } });

            if (validTags.length !== tagArray.length) {
                return res.status(400).json({ message: "Tag tidak ada" });
            }

            await Promise.all(
                validTags.map(async (tag) => {
                    await ArtikelTag.create({
                        artikelId: artikel.id,
                        tagId: tag.id,
                    });
                })
            );
        }

        res.status(201).json({
            message: "Artikel Berhasil Ditambahkan!",
            data: artikel,
            tags,
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
        const artikels = await Artikel.findAll({ include: Tag });
        res.status(200).json(artikels);
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
        const artikel = await Artikel.findByPk(req.params.id, { include: Tag });
        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak ada!" });
        }
        res.status(200).json(artikel);
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
        const { penulis, judul, deskripsi, tanggal, tags } = req.body;
        const gambar = req.file ? req.file.path : null;

        const artikel = await Artikel.findByPk(req.params.id);
        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak ada!" });
        }

        let gambar_path = artikel.gambar;
        if (req.file) {
            const dir = "public/images/artikel";
            ensureDir(dir);
            gambar_path = path.join(
                dir,
                `${Date.now()}-${req.file.originalname}`
            );
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(gambar_path, req.file.buffer);

            if (artikel.gambar) {
                fs.unlinkSync(path.join(dir, `${artikel.gambar}`));
            }
        }

        await artikel.update({
            penulis,
            judul,
            slug: slugify(judul, { replacement: "-", lower: true }),
            deskripsi,
            tanggal,
            gambar: gambar_name,
        });

        if (tags) {
            const tagArray = tags
                .split(",")
                .map((tagId) => parseInt(tagId.trim()));
            const validTags = await Tag.findAll({ where: { id: tagArray } });

            if (validTags.length !== tagArray.length) {
                return res.status(400).json({ message: "Tag tidak ada!" });
            }

            await ArtikelTag.destroy({ where: { artikelId: artikel.id } });

            await Promise.all(
                validTags.map(async (tag) => {
                    await ArtikelTag.create({
                        artikelId: artikel.id,
                        tagId: tag.id,
                    });
                })
            );
        }

        res.status(200).json({
            message: "Artikel Berhasil Diupdate!",
            data: artikel,
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
        const artikel = await Artikel.findByPk(req.params.id);
        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak ada!" });
        }

        // Delete image file
        if (artikel.gambar) {
            fs.unlink(
                path.resolve(`public/images/artikel/${artikel.gambar}`),
                (err) => {
                    if (err) console.error(err);
                }
            );
        }

        await ArtikelTag.destroy({ where: { artikelId: artikel.id } });
        await artikel.destroy();

        res.status(200).json({
            message: "Artikel Berhasil Dihapus!",
            data: artikel,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
