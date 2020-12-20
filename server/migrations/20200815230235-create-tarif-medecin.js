'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TarifMedecins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medecinId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Medecins",
          key: "id",
        }
      },
      tarifId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tarifs",
          key: "id",
        }
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
    await queryInterface.dropTable('TarifMedecins');
  }
};