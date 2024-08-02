const {
    Investor,
    InvestorBiodata,
    InvestorIdentitas,
    InvestorDataPendukung,
    InvestorAlamat,
} = require("../models");

// Read All
exports.findAll = async (req, res) => {
    try {
        const investors = await Investor.findAll({
            include: [
                InvestorBiodata,
                InvestorIdentitas,
                InvestorDataPendukung,
                InvestorAlamat,
            ],
        });
        res.status(200).json({
            message: "Data Investor berhasil diambil!",
            data: investors,
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
        const investor = await Investor.findByPk(req.params.id, {
            include: [
                InvestorBiodata,
                InvestorIdentitas,
                InvestorDataPendukung,
                InvestorAlamat,
            ],
        });
        if (!investor) {
            return res
                .status(404)
                .json({ message: "Data Investor tidak ada!" });
        }
        res.status(200).json({
            message: "Data Investor berhasil diambil",
            data: investor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
