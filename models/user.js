"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

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
        //encrypt the password using bcrypt and set that value to the password property
        set(rawPassword) {
            const hashedPassword = bcrypt.hashSync(rawPassword, 10);
            this.setDataValue('password', hashedPassword);   
        },
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
