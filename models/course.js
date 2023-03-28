"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        field: 'title',
        allowNull: false,
      validate: {
        notNull: {
          msg: 'A course title is required'
        },
        notEmpty: {
          msg: 'Please provide a title for the course'
        }
      }
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
        allowNull: false,
      validate: {
        notNull: {
          msg: 'A course description is required'
        },
        notEmpty: {
          msg: 'Please provide description for the course'
        }
      }
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'user', //alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    });
  };

  return Course;
};
