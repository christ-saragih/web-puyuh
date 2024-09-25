"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AdminBiodata extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association
            AdminBiodata.belongsTo(models.Admin, {
                foreignKey: "adminId",
                as: "admin",
            });
        }
    }
    AdminBiodata.init(
        {
            adminId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Admins",
                    key: "id",
                },
            },
            foto_profil: {
                type: DataTypes.STRING,
            },
            nama_lengkap: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nama lengkap tidak boleh null!" },
                    notEmpty: { msg: "Nama lengkap tidak boleh kosong!" },
                },
            },
            jk: {
                type: DataTypes.ENUM("pria", "wanita"),
                validate: {
                    isIn: {
                        args: [["pria", "wanita"]],
                        msg: "Status harus salah satu dari 'pria' atau 'wanita'",
                    },
                },
            },
            tempat_lahir: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Tempat lahir tidak boleh kosong!" },
                },
            },
            tanggal_lahir: {
                type: DataTypes.DATEONLY,
                validate: {
                    notEmpty: { msg: "Tanggal tidak boleh kosong!" },
                },
            },
            no_hp: {
                type: DataTypes.STRING,
                validate: {
                    isNumeric: { msg: "Numerik" },
                },
            },
        },
        {
            sequelize,
            modelName: "AdminBiodata",
        }
    );
    return AdminBiodata;
};
