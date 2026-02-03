"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: "ETH4400",
        capacity: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "UAE334",
        capacity: 190,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airplanes", {
      [Op.or]: [
        { modelNumber: "ETH4400" }, 
        { modelNumber: "UAE334" }
      ],
    });
  },
};