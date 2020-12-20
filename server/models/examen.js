'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Examen.belongsTo(models.Consultation, {
        foreignKey: {
          allowNull: false
        }
      })

      // Examen.belongsTo(models.Type_examen, {
      //   foreignKey: {
      //     allowNull: false
      //   }
      // })
    }
  };
  Examen.init({
    nom: DataTypes.STRING,
    resultat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Examen',
  });
  return Examen;
};