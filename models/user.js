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
          msg: 'A first name is required'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'lastName',
        allowNull: false,
      validate: {
        notNull: {
          msg: 'A last name is required'
        },
        notEmpty: {
          msg: 'Please provide a last name'
        }
      }
      },
      emailAddress: {
        type: DataTypes.STRING,
        field: 'emailAddress',
        allowNull: false,
        unique: {
          msg: 'The email you entered already exists'
        },
        validate: {
          notNull: {
            msg: 'An email is required'
          },
          isEmail: {
            msg: 'Please provide a valid email address'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A password is required'
          },
          notEmpty: {
            msg: 'Please provide a password'
          },
          len: {
            args: [8, 20],
            msg: 'The password should be between 8 and 20 characters in length'
          },
        },
      },
    },
    { sequelize,
      hooks: {
        // Hash the password before creating a new user - this allows for validation of the password
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      }
    }
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
