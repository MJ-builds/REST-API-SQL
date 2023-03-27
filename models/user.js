"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      emailAddress: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  // todo: Add associations 'as' property to the model definition.
  User.associations = (models) => {
    User.hasMany(models.Course, 
      { 
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        }
      });
  };

  return User;
};
