const path = require("path");

exports.validateUploadFile = (options) => {
    return (req, res, next) => {
        const {
            fieldName = "image",
            allowedFileTypes = /jpeg|jpg|png/,
            maxFileSize = 1024 * 1024 * 5, // Default to 5MB
            required = true,
        } = options;

        if (required && !req.file) {
            return res.status(400).json({
                message: "Validation error",
                errors: [
                    { msg: `${fieldName} harus diupload` },
                    // { msg: `${fieldName} harus diupload`, path: fieldName },
                ],
            });
        }

        if (req.file) {
            const mimetype = allowedFileTypes.test(req.file.mimetype);
            const extname = allowedFileTypes.test(
                path.extname(req.file.originalname).toLowerCase()
            );

            if (!mimetype || !extname) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: [
                        {
                            msg: `Kesalahan: Hanya file dengan tipe ${allowedFileTypes.toString()} yang diizinkan!`,
                            // path: fieldName,
                        },
                    ],
                });
            }

            if (req.file.size > maxFileSize) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: [
                        {
                            msg: `Kesalahan: Ukuran file maksimal ${
                                maxFileSize / (1024 * 1024)
                            }MB!`,
                            // path: fieldName,
                        },
                    ],
                });
            }
        }

        next();
    };
};
