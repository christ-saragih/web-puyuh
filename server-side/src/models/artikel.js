"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Artikel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Artikel.belongsToMany(models.Tag, {
                through: models.ArtikelTag,
                foreignKey: "artikelId",
            });
        }
    }
    Artikel.init(
        {
            penulis: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Penulis tidak boleh null!" },
                    notEmpty: { msg: "Penulis tidak boleh kosong!" },
                },
            },
            jumlah_penglihat: DataTypes.INTEGER,
            slug: DataTypes.STRING,
            judul: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Judul tidak boleh null!" },
                    notEmpty: { msg: "Judul tidak boleh kosong!" },
                },
            },
            gambar: DataTypes.STRING,
            deskripsi: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Deskripsi tidak boleh null!" },
                    notEmpty: { msg: "Deskripsi tidak boleh kosong!" },
                },
            },
            tanggal: {
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
            modelName: "Artikel",
        }
    );
    return Artikel;
};
