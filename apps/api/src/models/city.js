"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      // 1. Tell City it has many Airports
      // Use models.Airport (Capitalized) to match your other model's name
      this.hasMany(models.Airport, {
        foreignKey: "cityId",
        as: "airports",
      });
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "City",
    },
  );
  return City;
};
