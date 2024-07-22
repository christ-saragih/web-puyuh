"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Founder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Founder.init(
        {
            nama: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nama tidak boleh null!" },
                    notEmpty: { msg: "Nama tidak boleh kosong!" },
                },
            },
            jabatan: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Jabatan tidak boleh null!" },
                    notEmpty: { msg: "Jabatan tidak boleh kosong!" },
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
            gambar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Founder",
        }
    );
    return Founder;
};
