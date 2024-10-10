const multer = require("multer");
const path = require("path");

// Use memory storage to store the file temporarily
const storage = multer.memoryStorage();

// Filter file untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(null, false);
        // cb("Kesalahan: Hanya gambar yang diizinkan!");
    }
};

// Inisialisasi multer dengan penyimpanan dan filter
const upload = multer({
    storage: storage,
    // fileFilter: fileFilter,
    // limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 5MB
});

module.exports = upload;
