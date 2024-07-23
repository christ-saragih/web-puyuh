const { Role } = require("../models");

// Create Role
exports.create = async (req, res) => {
    try {
        const { nama } = req.body;

        const role = await Role.create({
            nama,
        });

        res.status(201).json({
            message: "Role berhasil ditambahkan!",
            data: role,
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

// Read all Faqs
exports.getAll = async (req, res) => {
    try {
        const role = await Role.findAll();
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read one Role
exports.getOne = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role tidak ditemukan" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update Role
exports.update = async (req, res) => {
    try {
        const { nama } = req.body;

        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role tidak ditemukan" });
        }

        await role.update({ nama });

        res.status(200).json({
            message: "Role berhasil diupdate!",
            data: role,
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

// Delete Role
exports.delete = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role tidak ditemukan" });
        }

        await role.destroy();

        res.status(200).json({ message: "Role berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
