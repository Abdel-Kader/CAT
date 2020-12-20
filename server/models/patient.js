'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Patient.init({
    date_naissance: DataTypes.DATE,
    lieu_naissance: DataTypes.STRING,
    sexe: DataTypes.STRING,
    num_dossier: DataTypes.INTEGER,
    profession: DataTypes.STRING,
    sportif: DataTypes.BOOLEAN,
    discipline_sportive: DataTypes.STRING,
    fumeur: DataTypes.BOOLEAN,
    nb_cigarette: DataTypes.INTEGER,
    fumeur_depuis: DataTypes.DATE,
    nb_paquet_an: DataTypes.INTEGER,
    alcool: DataTypes.BOOLEAN,
    regime: DataTypes.BOOLEAN,
    detail_regime: DataTypes.STRING,
    nb_grossesse: DataTypes.INTEGER,
    nb_avortement: DataTypes.INTEGER,
    date_regle: DataTypes.DATE,
    nb_garçon: DataTypes.INTEGER,
    nb_fille: DataTypes.INTEGER,
    ethnie: DataTypes.STRING,
    address_parent: DataTypes.STRING,
    de_hopital: DataTypes.STRING,
    telephone_referent: DataTypes.STRING,
    niveau_social: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};