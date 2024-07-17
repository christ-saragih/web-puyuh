const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");

const app = express();
var corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const berandaRoutes = require("./routes/berandaFrontpageRoutes");
const sosialMediaRoutes = require("./routes/sosialMediaRoutes");
const kontakFrontpageRoutes = require("./routes/kontakFrontpageRoutes");
const dokumentasiFrontpage = require("./routes/dokumentasiFrontpage");

app.use("/api/beranda", berandaRoutes);
app.use("/api/sosial-media", sosialMediaRoutes);
app.use("/api/kontak-frontpage", kontakFrontpageRoutes);
app.use("/api/dokumentasi-frontpage", dokumentasiFrontpage);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Database Connected!");
    } catch (error) {
        console.error("Database Connection Failed:", error);
    }
});
