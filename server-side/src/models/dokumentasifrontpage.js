"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DokumentasiFrontpage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    DokumentasiFrontpage.init(
        {
            nama: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Nama tidak boleh kosong!" },
                    notNull: { msg: "Nama tidak boleh null!" },
                },
            },
            image: {
                type: DataTypes.STRING,
                // allowNull: false,
                // validate: {
                //     notNull: { msg: "Gambar tidak boleh null!" },
                // },
            },
        },
        {
            sequelize,
            modelName: "DokumentasiFrontpage",
        }
    );
    return DokumentasiFrontpage;
};
