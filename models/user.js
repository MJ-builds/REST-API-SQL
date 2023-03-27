"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        field: 'firstName',
        allowNull: false,
      validate: {
        notNull: {
          msg: 'A name is required'
        },
        notEmpty: {
          msg: 'Please provide a name'
        }
      }
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'lastName',
      },
      emailAddress: {
        type: DataTypes.STRING,
        unique: true,
        field: 'emailAddress'
      },
      password: {
        type: DataTypes.STRING,
        //encrypt the password using bcrypt and set that value to the password property
        set(rawPassword) {
            const hashedPassword = bcrypt.hashSync(rawPassword, 10);
            this.setDataValue('password', hashedPassword);   
        },
        field: 'password',
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
