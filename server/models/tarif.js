'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tarif.belongsToMany(models.Medecin, {
        through: 'TarifMedecin',
        as: 'tarif_med',
        foreignKey: 'tarifId',
        otherKey: 'medecinId'
      });
    }
  };
  Tarif.init({
    tarif: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarif',
  });
  return Tarif;
};