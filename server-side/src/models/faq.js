"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Faq extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Faq.init(
        {
            pertanyaan: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Pertanyaan tidak boleh null!" },
                    notEmpty: { msg: "Pertanyaan tidak boleh kosong!" },
                },
            },
            jawaban: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Jawaban tidak boleh null!" },
                    notEmpty: { msg: "Jawaban tidak boleh kosong!" },
                },
            },
            status: {
                type: DataTypes.ENUM("aktif", "tidak-aktif"),
                allowNull: false,
                validate: {
                    notNull: { msg: "Status tidak boleh null!" },
                    isIn: {
                        args: [["aktif", "tidak-aktif"]],
                        msg: "Status harus salah satu dari 'aktif' atau 'tidak-aktif'",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Faq",
        }
    );
    return Faq;
};
