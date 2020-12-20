'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rendezvous extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rendezvous.belongsTo(models.Medecin, {
        foreignKey: {
          allowNull: false
        }
      })
      Rendezvous.belongsTo(models.Patient, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Rendezvous.init({
    date: DataTypes.DATE,
    motif: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    title: DataTypes.STRING,
    status: DataTypes.BOOLEAN
    // date_rdv: DataTypes.DATEONLY,
    // heure_rdv: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'Rendezvous',
  });
  return Rendezvous;
};