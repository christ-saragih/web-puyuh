"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SosialMedia extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SosialMedia.init(
        {
            nama: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Nama tidak boleh kosong!" },
                },
            },
            icon: {
                type: DataTypes.STRING,
                // allowNull: false,
                // validate: {
                //     notNull: { msg: "Icon tidak boleh kosong!" },
                // },
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Url tidak boleh kosong!" },
                    isUrl: { msg: "Url harus berupa link URL" },
                },
            },
        },
        {
            sequelize,
            modelName: "SosialMedia",
        }
    );
    return SosialMedia;
};
