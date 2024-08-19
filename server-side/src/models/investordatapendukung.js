"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class InvestorDataPendukung extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            InvestorDataPendukung.belongsTo(models.Investor, {
                foreignKey: "investorId",
            });
        }
    }
    InvestorDataPendukung.init(
        {
            investorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Investors",
                    key: "id",
                },
            },
            latar_pendidikan: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Latar Pendidikan tidak boleh null!" },
                    notEmpty: { msg: "Latar Pendidikan tidak boleh kosong!" },
                },
            },
            sumber_penghasilan: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Sumber penghasilan tidak boleh null!" },
                    notEmpty: { msg: "Sumber penghasilan tidak boleh kosong!" },
                },
            },
            jumlah_penghasilan: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Jumlah penghasilan tidak boleh null!" },
                    notEmpty: { msg: "Jumlah penghasilan tidak boleh kosong!" },
                },
            },
            bidang_usaha: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Bidang usaha tidak boleh null!" },
                    notEmpty: { msg: "Bidang usaha tidak boleh kosong!" },
                },
            },
            tujuan_investasi: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Tujuan investasi tidak boleh null!" },
                    notEmpty: { msg: "Tujuan investasi tidak boleh kosong!" },
                },
            },
            no_sid: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nomor Sid tidak boleh null!" },
                    notEmpty: { msg: "Nomor Sid tidak boleh kosong!" },
                },
            },
            tanggal_pembuatan_sid: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: { msg: "Tanggal tidak boleh null!" },
                    notEmpty: { msg: "Tanggal tidak boleh kosong!" },
                },
            },
        },
        {
            sequelize,
            modelName: "InvestorDataPendukung",
            tableName: "investordatapendukung",
        }
    );
    return InvestorDataPendukung;
};
