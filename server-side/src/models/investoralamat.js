"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class InvestorAlamat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            InvestorAlamat.belongsTo(models.Investor, {
                foreignKey: "investorId",
            });
        }
    }
    InvestorAlamat.init(
        {
            investorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Investors",
                    key: "id",
                },
            },
            alamat: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Alamat tidak boleh null!" },
                    notEmpty: { msg: "Alamat tidak boleh kosong!" },
                },
            },
            provinsi: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Provinsi tidak boleh null!" },
                    notEmpty: { msg: "Provinsi tidak boleh kosong!" },
                },
            },
            kota: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Kota tidak boleh null!" },
                    notEmpty: { msg: "Kota tidak boleh kosong!" },
                },
            },
            kecamatan: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Kecamatan tidak boleh null!" },
                    notEmpty: { msg: "Kecamatan tidak boleh kosong!" },
                },
            },
            kelurahan: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Kelurahan tidak boleh null!" },
                    notEmpty: { msg: "Kelurahan tidak boleh kosong!" },
                },
            },
            kode_pos: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nama lengkap tidak boleh null!" },
                    notEmpty: { msg: "Nama lengkap tidak boleh kosong!" },
                },
            },
        },
        {
            sequelize,
            modelName: "InvestorAlamat",
            tableName: "investoralamat",
        }
    );
    return InvestorAlamat;
};
