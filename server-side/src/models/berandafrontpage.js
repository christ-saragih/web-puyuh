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
            nama_header: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Nama Header tidak boleh kosong!" },
                },
            },
            nama_subheader: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Nama sub header tidak boleh kosong!" },
                },
            },
            image_header: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Gambar tidak boleh kosong!" },
                },
            },
        },
        {
            sequelize,
            modelName: "BerandaFrontpage",
        }
    );
    return BerandaFrontpage;
};
