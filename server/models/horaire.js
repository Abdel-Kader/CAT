'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Horaire.belongsToMany(models.Medecin, {
        through: 'HoraireMedecin',
        as: 'medecins',
        foreignKey: 'horaireId',
        otherKey: 'medecinId'
      });
    }
  }
  
  Horaire.init({
    type: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Horaire',
  });
  return Horaire;
};