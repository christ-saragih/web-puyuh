"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class InvestorBiodata extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    InvestorBiodata.init(
        {
            investorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Investors",
                    key: "id",
                },
            },
            nama_lengkap: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nama lengkap tidak boleh null!" },
                    notEmpty: { msg: "Nama lengkap tidak boleh kosong!" },
                },
            },
            jk: {
                type: DataTypes.ENUM("pria", "wanita"),
                validate: {
                    isIn: {
                        args: [["pria", "wanita"]],
                        msg: "Status harus salah satu dari 'pria' atau 'wanita'",
                    },
                },
            },
            tampat_lahir: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Tempat lahir tidak boleh kosong!" },
                },
            },
            tanggal_lahir: {
                type: DataTypes.DATE,
                validate: {
                    notEmpty: { msg: "Tanggal tidak boleh kosong!" },
                },
            },
            no_hp: {
                type: DataTypes.STRING,
                validate: {
                    isNumeric: { msg: "Numerik" },
                },
            },
            kategori_investor: {
                type: DataTypes.ENUM("individu", "organisasi"),
                allowNull: false,
                validate: {
                    notNull: { msg: "Kategori tidak boleh null!" },
                    isIn: {
                        args: [["individu", "organisasi"]],
                        msg: "Status harus salah satu dari 'individu' atau 'organisasi'",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "InvestorBiodata",
        }
    );
    return InvestorBiodata;
};