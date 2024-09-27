const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // React app URL
        credentials: true,
    })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.ACCESS_SECRET_KEY || "ACCESS_SECRET_KEY",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Ubah menjadi true jika menggunakan https
    })
);

const PORT = process.env.PORT || 3000;

const berandaRoutes = require("./routes/berandaFrontpageRoutes");
const sosialMediaRoutes = require("./routes/sosialMediaRoutes");
const kontakFrontpageRoutes = require("./routes/kontakFrontpageRoutes");
const dokumentasiFrontpageRoutes = require("./routes/dokumentasiFrontpageRoutes");
const tagRoutes = require("./routes/tagRoutes");
const artikelRoutes = require("./routes/artikelRoutes");
const faqRoutes = require("./routes/faqRoutes");
const tentangKamiRoutes = require("./routes/tentangKamiRoutes");
const sejarahRoutes = require("./routes/sejarahRoutes");
const dokumenFrontpageRoutes = require("./routes/dokumenFrontpageRoutes");
const founderRoutes = require("./routes/founderRoutes");
const authInvestorRoutes = require("./routes/authInvestorRoutes");
const authAdminRoutes = require("./routes/authAdminRoutes");
const investorBiodataRoutes = require("./routes/investorBiodataRoutes");
const investorAlamatRoutes = require("./routes/investorAlamatRoutes");
const investorIdentitasRoutes = require("./routes/investorIdentitasRoutes");
const investorDataPendukungRoutes = require("./routes/investorDataPendukungRoutes");
const adminBiodataRoutes = require("./routes/adminBiodataRoutes");
const investasiRoutes = require("./routes/investasiRoutes");
const adminRoutes = require("./routes/adminRoutes");
const investorRoutes = require("./routes/investorRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");
const notifikasiRoutes = require("./routes/notifikasiRoutes");

app.use("/api/beranda", berandaRoutes);
app.use("/api/sosial-media", sosialMediaRoutes);
app.use("/api/kontak-frontpage", kontakFrontpageRoutes);
app.use("/api/dokumentasi-frontpage", dokumentasiFrontpageRoutes);
app.use("/api/tag-artikel", tagRoutes);
app.use("/api/artikel", artikelRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/tentang-kami", tentangKamiRoutes);
app.use("/api/sejarah", sejarahRoutes);
app.use("/api/dokumen-frontpage", dokumenFrontpageRoutes);
app.use("/api/founder", founderRoutes);
app.use("/api/auth/investor", authInvestorRoutes);
app.use("/api/auth/admin", authAdminRoutes);
app.use("/api/biodata-investor", investorBiodataRoutes);
app.use("/api/alamat-investor", investorAlamatRoutes);
app.use("/api/identitas-investor", investorIdentitasRoutes);
app.use("/api/data-pendukung-investor", investorDataPendukungRoutes);
app.use("/api/biodata-admin", adminBiodataRoutes);
app.use("/api/investasi", investasiRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/investor", investorRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/notifikasi", notifikasiRoutes);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Database Connected!");
    } catch (error) {
        console.error("Database Connection Failed:", error);
    }
});
