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
            refresh_token: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "Investor",
        }
    );
    return Investor;
};
