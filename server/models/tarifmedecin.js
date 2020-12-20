'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TarifMedecin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TarifMedecin.init({
    medecinId: DataTypes.INTEGER,
    tarifId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TarifMedecin',
  });
  return TarifMedecin;
};