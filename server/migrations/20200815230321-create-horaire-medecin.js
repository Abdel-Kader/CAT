'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HoraireMedecins', {
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
      horaireId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Horaires",
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
    await queryInterface.dropTable('HoraireMedecins');
  }
};