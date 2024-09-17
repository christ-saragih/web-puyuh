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
            Transaksi.belongsTo(models.Investor, {
                foreignKey: "investorId",
                as: "investor",
            });
            Transaksi.belongsTo(models.Investasi, {
                foreignKey: "investasiId",
                as: "investasi",
            });
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
            investasiId: {
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
                type: DataTypes.ENUM("gagal", "proses", "berhasil"),
                allowNull: false,
                validate: {
                    isIn: {
                        args: [["gagal", "proses", "berhasil"]],
                        msg: "Status harus salah satu dari 'gagal', 'proses' atau 'berhasil'",
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
