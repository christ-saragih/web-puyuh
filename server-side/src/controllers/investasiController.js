const {
    Investasi,
    Transaksi,
    Investor,
    InvestorBiodata,
} = require("../models");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const { Op } = require("sequelize");
const { default: slugify } = require("slugify");
const { sendNotification } = require("../services/notifikasiService");

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const {
            judul,
            deskripsi,
            alamat,
            url_map,
            penerbit,
            penggunaan_dana,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            target_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
        } = req.body;

        const adminId = req.user.id;

        const gambar = req.file ? req.file.buffer : null;

        const existingInvestasi = await Investasi.findOne({
            where: { judul },
        });

        if (existingInvestasi) {
            return res.status(400).json({
                message: "Judul investasi sudah ada!",
            });
        }

        let gambar_name = null;

        if (
            gambar &&
            judul &&
            deskripsi &&
            alamat &&
            url_map &&
            penerbit &&
            penggunaan_dana &&
            bagi_hasil &&
            minimum_investasi &&
            maksimum_investasi &&
            target_pendanaan &&
            tenor &&
            pembayaran_bagi_hasil &&
            tanggal_pembukaan_penawaran &&
            tanggal_berakhir_penawaran
        ) {
            const dir = "public/images/investasi";
            ensureDir(dir);
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, gambar_name), gambar);
        }

        let statusPenawaran = "";

        const now = new Date();

        const pembukaan = new Date(tanggal_pembukaan_penawaran);
        const penutupan = new Date(tanggal_berakhir_penawaran);

        if (now >= pembukaan && now <= penutupan) {
            statusPenawaran = "proses";
        } else if (pembukaan > now) {
            statusPenawaran = "segera";
        } else {
            statusPenawaran = "selesai";
        }

        const investasi = await Investasi.create({
            adminId: adminId,
            judul,
            deskripsi,
            alamat,
            url_map,
            gambar: gambar_name,
            slug: slugify(judul, { replacement: "-", lower: true }),
            penerbit,
            penggunaan_dana,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            target_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status: statusPenawaran,
        });

        // await sendNotification(judul, tanggal_pembukaan_penawaran);

        res.status(201).json({
            message: "Data  Berhasil Ditambahkan!",
            data: investasi,
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

// // Read All
exports.findAll = async (req, res) => {
    try {
        const now = new Date();

        // Perbarui status investasi sebelum mengambil data
        await Investasi.update(
            { status: "proses" },
            {
                where: {
                    status: "segera",
                    tanggal_pembukaan_penawaran: { [Op.lte]: now },
                },
            }
        );

        await Investasi.update(
            { status: "selesai" },
            {
                where: {
                    status: "proses",
                    tanggal_berakhir_penawaran: { [Op.lte]: now },
                },
            }
        );

        const investasi = await Investasi.findAll({
            include: {
                model: Transaksi,
                as: "transaksi",
                attributes: ["investorId", "total_investasi"], // Ambil total_investasi juga
                include: {
                    model: Investor,
                    as: "investor",
                    attributes: ["id", "kategori_investor"], // Atribut lain yang diperlukan
                    include: {
                        model: InvestorBiodata,
                        as: "investorBiodata",
                        attributes: ["nama_lengkap", "foto_profil"], // Ambil nama_lengkap dari biodataInvestor
                    },
                },
            },
        });

        // Proses data untuk mengakumulasi total_investasi berdasarkan investorId dan investasiId
        const investasiWithTotal = investasi.map((item) => {
            const transaksi = item.transaksi;

            // Gunakan objek sebagai map untuk akumulasi total_investasi
            const transaksiMap = {};

            transaksi.forEach((current) => {
                const key = `${current.investorId}-${item.id}`; // Buat kunci unik berdasarkan investorId dan investasiId

                if (transaksiMap[key]) {
                    // Jika kunci sudah ada, tambahkan total_investasi
                    transaksiMap[key].total_investasi +=
                        current.total_investasi;
                } else {
                    // Jika belum ada, tambahkan data transaksi baru
                    transaksiMap[key] = {
                        investorId: current.investorId,
                        nama_lengkap:
                            current.investor.investorBiodata.nama_lengkap,
                        foto_profil:
                            current.investor.investorBiodata.foto_profil,
                        total_investasi: current.total_investasi,
                        kategori_investor: current.investor.kategori_investor,
                        // investasiId: item.id,
                    };
                }
            });

            // Mengubah transaksiMap kembali menjadi array dengan transaksi unik
            const uniqueTransaksi = Object.values(transaksiMap);

            // Mengembalikan objek investasi dengan transaksi yang telah diakumulasi dan unik
            return {
                ...item.toJSON(),
                transaksi: uniqueTransaksi,
            };
        });

        res.status(200).json({
            message: "Data berhasil diambil!",
            data: investasiWithTotal,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get all transactions by investasi Id
exports.getAllTransactionByInvestasiId = async (req, res) => {
    try {
        const { investasiId } = req.params;
        const transaksi = await Transaksi.findAll({
            where: { investasiId: investasiId },
        });
        res.status(200).json({
            message: "Data Transaksi!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get one transactions by investasi Id
exports.getOneTransactionByInvestasiId = async (req, res) => {
    try {
        const { investasiId, id } = req.params;
        const transaksi = await Transaksi.findOne({
            where: { investasiId, id },
        });
        res.status(200).json({
            message: "Data Transaksi!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get all investor by investasi Id
exports.getAllInvestorByInvestasiId = async (req, res) => {
    try {
        const { investasiId } = req.params;
        const transaksi = await Transaksi.findAll({
            where: { investasiId: investasiId },
            attributes: ["investorId"],
            group: ["investorId"],
            include: [
                {
                    model: Investor,
                    include: [
                        {
                            model: InvestorBiodata,
                            attributes: ["nama_lengkap"],
                            as: "investorBiodata",
                        },
                    ],
                    attributes: ["id"],
                    as: "investor",
                },
            ],
        });
        res.status(200).json({
            message: "Data Transaksi!",
            data: transaksi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Read one By Slug
exports.findDataBySlug = async (req, res) => {
    try {
        const investasi = await Investasi.findOne({
            where: { slug: req.params.slug }, // Cari investasi berdasarkan slug
            include: {
                model: Transaksi,
                as: "transaksi",
                attributes: ["investorId", "total_investasi"], // Ambil total_investasi juga
                include: {
                    model: Investor,
                    as: "investor",
                    attributes: ["id", "kategori_investor"], // Atribut lain yang diperlukan
                    include: {
                        model: InvestorBiodata,
                        as: "investorBiodata",
                        attributes: ["nama_lengkap", "foto_profil"], // Ambil nama_lengkap dan foto_profil dari biodataInvestor
                    },
                },
            },
        });

        if (!investasi) {
            return res.status(404).json({
                message: "Investasi tidak ditemukan!",
            });
        }

        // Proses data untuk mengakumulasi total_investasi berdasarkan investorId dan investasiId
        const transaksi = investasi.transaksi;

        // Gunakan objek sebagai map untuk akumulasi total_investasi
        const transaksiMap = {};

        transaksi.forEach((current) => {
            const key = `${current.investorId}-${investasi.id}`; // Buat kunci unik berdasarkan investorId dan investasiId

            if (transaksiMap[key]) {
                // Jika kunci sudah ada, tambahkan total_investasi
                transaksiMap[key].total_investasi += current.total_investasi;
            } else {
                // Jika belum ada, tambahkan data transaksi baru
                transaksiMap[key] = {
                    investorId: current.investorId,
                    nama_lengkap: current.investor.investorBiodata.nama_lengkap,
                    foto_profil: current.investor.investorBiodata.foto_profil,
                    total_investasi: current.total_investasi,
                    kategori_investor: current.investor.kategori_investor,
                    // investasiId: investasi.id,
                };
            }
        });

        // Mengubah transaksiMap kembali menjadi array dengan transaksi unik
        const uniqueTransaksi = Object.values(transaksiMap);

        // Mengembalikan objek investasi dengan transaksi yang telah diakumulasi dan unik
        const investasiWithTotal = {
            ...investasi.toJSON(),
            transaksi: uniqueTransaksi,
        };

        res.status(200).json({
            message: "Data Investasi berhasil diambil!",
            data: investasiWithTotal,
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
        const {
            judul,
            deskripsi,
            alamat,
            url_map,
            penerbit,
            penggunaan_dana,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            target_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
        } = req.body;

        // Cari investasi berdasarkan slug
        const investasi = await Investasi.findOne({
            where: { id: req.params.id },
            include: {
                model: Transaksi,
                as: "transaksi",
                attributes: ["investorId", "total_investasi"], // Ambil data transaksi
                include: {
                    model: Investor,
                    as: "investor",
                    attributes: ["id", "kategori_investor"], // Atribut lain yang diperlukan
                    include: {
                        model: InvestorBiodata,
                        as: "investorBiodata",
                        attributes: ["nama_lengkap", "foto_profil"], // Ambil nama_lengkap dan foto_profil dari biodataInvestor
                    },
                },
            },
        });

        const adminId = req.user.id;
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }

        const existingInvestasi = await Investasi.findOne({
            where: {
                judul,
                id: { [Op.ne]: req.params.id },
            },
        });

        if (existingInvestasi) {
            return res.status(400).json({
                message: "Judul investasi sudah ada!",
            });
        }

        let gambar_name = investasi.gambar;
        if (req.file) {
            const dir = "public/images/investasi";
            ensureDir(dir);
            gambar_name = `${Date.now()}-${req.file.originalname}`;
            fs.writeFileSync(path.join(dir, gambar_name), req.file.buffer);

            if (investasi.gambar) {
                const oldImagePath = path.join(dir, investasi.gambar);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        let statusPenawaran = "";

        const now = new Date();
        const pembukaan = new Date(tanggal_pembukaan_penawaran);
        const penutupan = new Date(tanggal_berakhir_penawaran);

        if (now >= pembukaan && now <= penutupan) {
            statusPenawaran = "proses";
        } else if (pembukaan > now) {
            statusPenawaran = "segera";
        } else {
            statusPenawaran = "selesai";
        }

        await investasi.update({
            adminId: adminId,
            judul,
            deskripsi,
            alamat,
            url_map,
            gambar: gambar_name,
            slug: slugify(judul, { replacement: "-", lower: true }),
            penerbit,
            penggunaan_dana,
            bagi_hasil,
            minimum_investasi,
            maksimum_investasi,
            target_pendanaan,
            tenor,
            pembayaran_bagi_hasil,
            tanggal_pembukaan_penawaran,
            tanggal_berakhir_penawaran,
            status: statusPenawaran,
        });

        // Proses data transaksi
        const transaksi = investasi.transaksi;

        // Gunakan objek sebagai map untuk akumulasi total_investasi
        const transaksiMap = {};

        transaksi.forEach((current) => {
            const key = `${current.investorId}-${investasi.id}`; // Buat kunci unik berdasarkan investorId dan investasiId

            if (transaksiMap[key]) {
                // Jika kunci sudah ada, tambahkan total_investasi
                transaksiMap[key].total_investasi += current.total_investasi;
            } else {
                // Jika belum ada, tambahkan data transaksi baru
                transaksiMap[key] = {
                    investorId: current.investorId,
                    nama_lengkap: current.investor.investorBiodata.nama_lengkap,
                    foto_profil: current.investor.investorBiodata.foto_profil,
                    total_investasi: current.total_investasi,
                    kategori_investor: current.investor.kategori_investor,
                };
            }
        });

        // Mengubah transaksiMap kembali menjadi array dengan transaksi unik
        const uniqueTransaksi = Object.values(transaksiMap);

        // Mengembalikan objek investasi dengan transaksi yang telah diakumulasi dan unik
        const investasiWithTotal = {
            ...investasi.toJSON(),
            transaksi: uniqueTransaksi,
        };

        res.status(200).json({
            message: "Investasi berhasil diperbarui!",
            data: investasiWithTotal,
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
        const investasi = await Investasi.findByPk(req.params.id);
        if (!investasi) {
            return res.status(404).json({ message: "Data  tidak ada!" });
        }

        // Delete image file
        if (investasi.gambar) {
            const imagePath = path.resolve(
                `public/images/investasi/${investasi.gambar}`
            );
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }

        await investasi.destroy();
        res.status(200).json({
            message: "Data  berhasil dihapus!",
            data: investasi,
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
    const dir = "public/images/investasi";
    const imagePath = path.join(dir, gambar);

    if (fs.existsSync(imagePath)) {
        res.sendFile(path.resolve(imagePath));
    } else {
        res.status(404).json({
            message: "Gambar tidak ditemukan",
        });
    }
};

exports.getInvestasiByStatus = async (req, res) => {
    try {
        const investasi = await Investasi.findAll({
            where: { status: req.query.status },
        });

        if (!investasi) {
            return res.status(404).json({ message: "Data investasi tidak !" });
        }
        res.status(200).json({
            message: "Investasi Berhasil Didapat!",
            data: investasi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getTotalInvestment = async (req, res) => {
    try {
        const totalInvestment = await Investasi.count();

        res.status(200).json({
            message: "Total Invesment",
            data: totalInvestment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
