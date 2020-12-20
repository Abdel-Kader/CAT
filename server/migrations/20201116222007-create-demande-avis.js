'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DemandeAvis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medRequerantId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Medecins",
          key: "id",
        }
      },
      medRequisId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Medecins",
          key: "id",
        }
      },
      commentaire: {
        type: Sequelize.TEXT
      },
      file1: {
        type: Sequelize.TEXT
      },
      file2: {
        type: Sequelize.TEXT
      },
      file3: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('DemandeAvis');
  }
};