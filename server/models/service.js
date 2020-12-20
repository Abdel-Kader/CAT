'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Service.belongsToMany(models.Specialite, {
      //   through: 'SpecialiteParService',
      //   as: 'specialite_service',
      //   foreignKey: 'serviceId',
      //   otherKey: 'specialiteId'
      // });
    }
  };
  Service.init({
    libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};