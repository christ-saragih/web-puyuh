"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Faq extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Faq.init(
        {
            judul: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Judul tidak boleh null!" },
                    notEmpty: { msg: "Judul tidak boleh kosong!" },
                },
            },
            deskripsi: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Deskripsi tidak boleh null!" },
                    notEmpty: { msg: "Deskripsi tidak boleh kosong!" },
                },
            },
            status: {
                type: DataTypes.ENUM("aktif", "tidak-aktif"),
                allowNull: false,
                validate: {
                    notNull: { msg: "Status tidak boleh null!" },
                    isIn: {
                        args: [["aktif", "tidak-aktif"]],
                        msg: "Status harus salah satu dari 'aktif' atau 'tidak-aktif'",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Faq",
        }
    );
    return Faq;
};
