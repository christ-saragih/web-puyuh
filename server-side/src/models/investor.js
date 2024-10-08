"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Investor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here\
            Investor.hasOne(models.InvestorBiodata, {
                foreignKey: "investorId",
                as: "investorBiodata",
            });
            Investor.hasOne(models.InvestorAlamat, {
                foreignKey: "investorId",
                as: "investorAlamat",
            });
            Investor.hasOne(models.InvestorIdentitas, {
                foreignKey: "investorId",
                as: "investorIdentitas",
            });
            Investor.hasOne(models.InvestorDataPendukung, {
                foreignKey: "investorId",
                as: "investorDataPendukung",
            });
            Investor.hasMany(models.Transaksi, {
                foreignKey: "investorId",
                as: "transaksi",
            });
        }
    }
    Investor.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Username sudah digunakan!",
                },
                validate: {
                    notNull: { msg: "Username tidak boleh null!" },
                    notEmpty: { msg: "Username tidak boleh kosong!" },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Email sudah digunakan!!",
                },
                validate: {
                    notNull: { msg: "Email tidak boleh null!" },
                    isEmail: { msg: "Email harus berformat email!" },
                    notEmpty: { msg: "Email tidak boleh kosong!" },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Password tidak boleh null!" },
                    notEmpty: { msg: "Password tidak boleh kosong!" },
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
            verificationToken: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            verificationTokenExpiry: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isVerifiedProfile: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            refresh_token: {
                type: DataTypes.TEXT,
            },
            resetPasswordToken: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            resetPasswordTokenExpiry: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Investor",
        }
    );
    return Investor;
};
