"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
     
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
