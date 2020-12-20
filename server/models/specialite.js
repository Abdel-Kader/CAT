'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Specialite.belongsToMany(models.Service, {
      //   through: 'SpecialiteParService',
      //   as: 'specialite_service',
      //   foreignKey: 'specialiteId',
      //   otherKey: 'serviceId'
      // });
      Specialite.hasMany(models.Medecin, { as: "medecins" });
    }
  };
  Specialite.init({
    libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Specialite',
  });
  return Specialite;
};