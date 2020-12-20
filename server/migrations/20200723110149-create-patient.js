'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        }
      },
      date_naissance: {
        type: Sequelize.DATE
      },
      lieu_naissance: {
        type: Sequelize.STRING
      },
      sexe: {
        type: Sequelize.STRING
      },
      num_dossier: {
        type: Sequelize.INTEGER
      },
      profession: {
        type: Sequelize.STRING
      },
      sportif: {
        type: Sequelize.BOOLEAN
      },
      discipline_sportive: {
        type: Sequelize.STRING
      },
      fumeur: {
        type: Sequelize.BOOLEAN
      },
      nb_cigarette: {
        type: Sequelize.INTEGER
      },
      fumeur_depuis: {
        type: Sequelize.DATE
      },
      nb_paquet_an: {
        type: Sequelize.INTEGER
      },
      alcool: {
        type: Sequelize.BOOLEAN
      },
      regime: {
        type: Sequelize.BOOLEAN
      },
      detail_regime: {
        type: Sequelize.STRING
      },
      nb_grossesse: {
        type: Sequelize.INTEGER
      },
      nb_avortement: {
        type: Sequelize.INTEGER
      },
      date_regle: {
        type: Sequelize.DATE
      },
      nb_garçon: {
        type: Sequelize.INTEGER
      },
      nb_fille: {
        type: Sequelize.INTEGER
      },
      ethnie: {
        type: Sequelize.STRING
      },
      address_parent: {
        type: Sequelize.STRING
      },
      de_hopital: {
        type: Sequelize.STRING
      },
      telephone_referent: {
        type: Sequelize.STRING
      },
      niveau_social: {
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
    await queryInterface.dropTable('Patients');
  }
};