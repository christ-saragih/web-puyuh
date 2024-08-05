"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class KontakFrontpage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    KontakFrontpage.init(
        {
            url_map: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Url map tidak boleh kosong!" },
                    // isUrl: { msg: "Url map harus berupa link url!" },
                    notNull: { msg: "Url map tidak boleh null" },
                },
            },
            alamat: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Alamat tidak boleh kosong" },
                    notNull: { msg: "Alamat tidak boleh null" },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Email tidak boleh kosong" },
                    isEmail: { msg: "Email harus berupa email" },
                    notNull: { msg: "Email tidak boleh null" },
                },
            },
            no_phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Nomor telpon tidak boleh kosong" },
                    notNull: { msg: "Nomor telpon tidak boleh null" },
                    isNumeric: { msg: "Numerik" },
                },
            },
        },
        {
            sequelize,
            modelName: "KontakFrontpage",
        }
    );
    return KontakFrontpage;
};
