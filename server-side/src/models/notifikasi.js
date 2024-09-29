"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Notifikasi extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Notifikasi.init(
        {
            investor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: "Investor Id tidak boleh null!" },
                    notEmpty: { msg: "Investor Id tidak boleh kosong!" },
                },
            },
            judul: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Judul tidak boleh null!" },
                    notEmpty: { msg: "Judul tidak boleh kosong!" },
                },
            },
            tanggal: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: { msg: "Tanggal tidak boleh null!" },
                    notEmpty: { msg: "Tanggal tidak boleh kosong!" },
                    isDate: { msg: "Tanggal harus berupa tanggal!" },
                },
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
                allowNull: false,
                validate: {
                    notNull: { msg: "Status tidak boleh null!" },
                    notEmpty: { msg: "Status tidak boleh kosong!" },
                },
            },
        },
        {
            sequelize,
            modelName: "Notifikasi",
        }
    );
    return Notifikasi;
};
