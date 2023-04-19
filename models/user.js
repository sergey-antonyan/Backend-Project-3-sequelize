'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
     
    }
  }
  User.init({
    role: {type:DataTypes.INTEGER, defaultValue: 0},
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_verified: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};