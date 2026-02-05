"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        foreignKey: "airplaneId",
        as: "flights",
      });
    }
  }
  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          // We convert to string first, then trim, to prevent the "trim is not a function" error
          this.setDataValue("modelNumber", String(val).trim());
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Airplane",
    },
  );
  return Airplane;
};
