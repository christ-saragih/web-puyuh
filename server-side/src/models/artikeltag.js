"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ArtikelTag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ArtikelTag.init(
        {
            artikelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Artikels",
                    key: "id",
                },
            },
            tagId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Tagz",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "ArtikelTag",
        }
    );
    return ArtikelTag;
};
