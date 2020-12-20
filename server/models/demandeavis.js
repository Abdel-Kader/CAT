'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DemandeAvis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DemandeAvis.belongsTo(models.Medecin, {
        as: 'medRequerant',
        foreignKey: {
          allowNull: false
        }
      })

      DemandeAvis.belongsTo(models.Medecin, {
        as: 'medRequis',
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  DemandeAvis.init({
    commentaire: DataTypes.TEXT,
    reponse: DataTypes.TEXT,
    file1: DataTypes.TEXT,
    file2: DataTypes.TEXT,
    file3: DataTypes.TEXT,
    statut: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    type: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DemandeAvis',
  });
  return DemandeAvis;
};