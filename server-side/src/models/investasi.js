"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Investasi extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Investasi.hasMany(models.Transaksi, {
                foreignKey: "investasiId",
                as: "transaksi",
            });
        }
    }
    Investasi.init(
        {
            adminId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Admins",
                    key: "id",
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
            deskripsi: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Deskripsi tidak boleh null!" },
                    notEmpty: { msg: "Deskripsi tidak boleh kosong!" },
                },
            },
            gambar: {
                type: DataTypes.STRING,
            },
            alamat: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Alamat tidak boleh null!" },
                    notEmpty: { msg: "Alamat tidak boleh kosong!" },
                },
            },
            url_map: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Url Map tidak boleh null!" },
                    notEmpty: { msg: "Url Map tidak boleh kosong!" },
                },
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Slug tidak boleh null!" },
                    notEmpty: { msg: "Slug tidak boleh kosong!" },
                },
            },
            penerbit: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Penerbit tidak boleh null!" },
                    notEmpty: { msg: "Penerbit tidak boleh kosong!" },
                },
            },
            penggunaan_dana: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Penggunaan Dana tidak boleh null!" },
                    notEmpty: { msg: "Penggunaan Dana tidak boleh kosong!" },
                },
            },
            bagi_hasil: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Bagi Hasil tidak boleh null!" },
                    notEmpty: { msg: "Bagi Hasil tidak boleh kosong!" },
                },
            },
            minimum_investasi: {
                type: DataTypes.BIGINT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Minimum Investasi tidak boleh null!" },
                    notEmpty: { msg: "Minimum Investasi tidak boleh kosong!" },
                },
            },
            maksimum_investasi: {
                type: DataTypes.BIGINT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Maksimum Investasi tidak boleh null!" },
                    notEmpty: { msg: "Maksimum Investasi tidak boleh kosong!" },
                },
            },
            total_pendanaan: {
                type: DataTypes.BIGINT,
                defaultValue: 0,
            },
            target_pendanaan: {
                type: DataTypes.BIGINT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Total Pendanaan tidak boleh null!" },
                    notEmpty: { msg: "Total Pendanaan tidak boleh kosong!" },
                },
            },
            tenor: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Tenor tidak boleh null!" },
                    notEmpty: { msg: "Tenor tidak boleh kosong!" },
                },
            },
            pembayaran_bagi_hasil: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Pembayaran Bagi Hasil tidak boleh null!" },
                    notEmpty: {
                        msg: "Pembayaran Bagi Hasil tidak boleh kosong!",
                    },
                },
            },
            tanggal_pembukaan_penawaran: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Tanggal Pembukaan Penawaran tidak boleh null!",
                    },
                    notEmpty: {
                        msg: "Tanggal Pembukaan Penawaran tidak boleh kosong!",
                    },
                },
            },
            tanggal_berakhir_penawaran: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Tanggal Berakhir Penawaran tidak boleh null!",
                    },
                    notEmpty: {
                        msg: "Tanggal Berakhir Penawaran tidak boleh kosong!",
                    },
                },
            },
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
            modelName: "Investasi",
        }
    );
    return Investasi;
};
