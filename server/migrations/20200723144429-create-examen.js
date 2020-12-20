'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Examens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      consultationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Consultations",
          key: "id",
        }
      },
      type_examenId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Type_examens",
          key: "id",
        }
      },
      nom: {
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
    await queryInterface.dropTable('Examens');
  }
};