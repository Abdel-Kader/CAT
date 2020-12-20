'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoraireMedecin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HoraireMedecin.init({
    medecinId: DataTypes.INTEGER,
    horaireId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HoraireMedecin',
  });
  return HoraireMedecin;
};