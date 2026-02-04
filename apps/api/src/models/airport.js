"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      this.belongsTo(models.City, {
       
        foreignKey: "cityId",
        as: "cityDetails",
      });
    }
  }
  Airport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      cityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Airport",
    },
  );
  return Airport;
};
