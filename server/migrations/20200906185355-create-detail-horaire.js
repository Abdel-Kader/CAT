'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailHoraires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      horaireId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Horaires",
          key: "id"
        }
      },
      date: {
        type: Sequelize.DATE
      },
      heure_debut: {
        type: Sequelize.DATE
      },
      heure_fin: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('DetailHoraires');
  }
};