"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DokumenFrontpage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    DokumenFrontpage.init(
        {
            nama: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nama tidak boleh null!" },
                    notEmpty: { msg: "Nama tidak boleh kosong!" },
                },
            },
            file: {
                type: DataTypes.STRING,
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
            modelName: "DokumenFrontpage",
        }
    );
    return DokumenFrontpage;
};
