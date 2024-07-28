const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.ACCESS_SECRET_KEY,
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
const roleRoutes = require("./routes/roleRoutes");
const investorBiodataRoutes = require("./routes/investorBiodataRoutes");
const investorAlamatRoutes = require("./routes/investorAlamatRoutes");
const investorIdentitasRoutes = require("./routes/investorIdentitasRoutes");

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
app.use("/api/investor", authInvestorRoutes);
app.use("/api/admin", authAdminRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/biodata-investor", investorBiodataRoutes);
app.use("/api/alamat-investor", investorAlamatRoutes);
app.use("/api/identitas-investor", investorIdentitasRoutes);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Database Connected!");
    } catch (error) {
        console.error("Database Connection Failed:", error);
    }
});
