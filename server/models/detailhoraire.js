'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailHoraire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailHoraire.belongsTo(models.Horaire, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  DetailHoraire.init({
    date: DataTypes.DATE,
    heure_debut: DataTypes.TIME,
    heure_fin: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'DetailHoraire',
  });
  return DetailHoraire;
};