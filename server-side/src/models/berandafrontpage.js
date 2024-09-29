"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BerandaFrontpage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BerandaFrontpage.init(
        {
            judul: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Judul tidak boleh kosong!" },
                },
            },
            subJudul: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Sub Judul tidak boleh kosong!" },
                },
            },
            gambar: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "BerandaFrontpage",
        }
    );
    return BerandaFrontpage;
};
