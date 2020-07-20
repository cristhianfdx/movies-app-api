'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.User, {
        through: 'UserMovie',
        as: 'users',
        foreignKey: 'userId',
        otherKey: 'movieId',
      });
    }
  }
  Movie.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );

  return Movie;
};
