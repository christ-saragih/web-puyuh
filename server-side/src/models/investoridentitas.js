"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class InvestorIdentitas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            InvestorIdentitas.belongsTo(models.Investor, {
                foreignKey: "investorId",
            });
        }
    }
    InvestorIdentitas.init(
        {
            investorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Investors",
                    key: "id",
                },
            },
            no_ktp: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nomor KTP tidak boleh null!" },
                    notEmpty: { msg: "Nomor KTP tidak boleh kosong!" },
                },
            },
            foto_ktp: DataTypes.STRING,
            no_npwp: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Nomor NPWP tidak boleh null!" },
                    notEmpty: { msg: "Nomor NPWP tidak boleh kosong!" },
                },
            },
            foto_npwp: DataTypes.STRING,
            selfie_ktp: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "InvestorIdentitas",
            tableName: "investoridentitas",
        }
    );
    return InvestorIdentitas;
};
