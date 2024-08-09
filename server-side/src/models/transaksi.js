"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaksi extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Transaksi.init(
        {
            investorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Investors",
                    key: "id",
                },
            },
            investasi: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Investasis",
                    key: "id",
                },
            },
            tanggal_transaksi: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Tanggal Transaksi tidak boleh null!",
                    },
                    notEmpty: {
                        msg: "Tanggal Transaksi tidak boleh kosong!",
                    },
                },
            },
            total_investasi: DataTypes.BIGINT,
            status: {
                type: DataTypes.ENUM("segera", "proses", "selesai"),
                allowNull: false,
                validate: {
                    isIn: {
                        args: [["segera", "proses", "selesai"]],
                        msg: "Status harus salah satu dari 'segera', 'proses' atau 'selesai'",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Transaksi",
        }
    );
    return Transaksi;
};
