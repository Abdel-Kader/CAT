'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consultation.belongsTo(models.Medecin, {
        foreignKey: {
          allowNull: false
        }
      })

      Consultation.hasMany(models.Examen, { as: "examens" });
      
      Consultation.belongsTo(models.Patient, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Consultation.init({
    date_consultation: DataTypes.DATE,
    heure_debut: DataTypes.TIME,
    heure_fin: DataTypes.TIME,
    cout: DataTypes.INTEGER,
    constantes: DataTypes.TEXT('long'),
    diagnostic: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Consultation',
  });
  return Consultation;
};