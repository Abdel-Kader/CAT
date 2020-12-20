'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medecin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medecin.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      
      Medecin.belongsTo(models.Specialite, {
        foreignKey: {
          allowNull: false
        },
        as: "specialite",
      })

      Medecin.belongsTo(models.Service, {
        foreignKey: {
          allowNull: false
        },
        as: "service",
      })

      Medecin.belongsToMany(models.Tarif, {
        through: 'TarifMedecin',
        as: 'tarif_med',
        foreignKey: 'medecinId',
        otherKey: 'tarifId'
      });

      Medecin.belongsToMany(models.Horaire, {
        through: 'HoraireMedecin',
        as: 'horaires',
        foreignKey: 'medecinId',
        otherKey: 'horaireId'
      });
    }
  }
  
  Medecin.init({
    signature: DataTypes.STRING,
    qrcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medecin',
  });
  return Medecin;
};
