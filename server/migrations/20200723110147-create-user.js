'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Profile",
          key: "id",
        }
      },
      first_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull:false,
        type: Sequelize.STRING,
        unique: true
      },
      address: {
        allowNull:true,
        type: Sequelize.STRING
      },
      email: {
        allowNull:true,
        type: Sequelize.STRING
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};