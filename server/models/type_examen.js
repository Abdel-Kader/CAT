'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_examen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Type_examen.init({
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type_examen',
  });
  return Type_examen;
};