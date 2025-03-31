const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  thumbnail: {
    type: DataTypes.STRING
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  maxStudents: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.DECIMAL(10, 2)
  },
  category: {
    type: DataTypes.STRING
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  prerequisites: {
    type: DataTypes.TEXT
  },
  objectives: {
    type: DataTypes.TEXT
  }
});

module.exports = Course; 