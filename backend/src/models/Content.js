const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
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
  type: {
    type: DataTypes.ENUM('text', 'video', 'document', 'quiz', 'assignment'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  videoUrl: {
    type: DataTypes.STRING
  },
  videoProvider: {
    type: DataTypes.ENUM('youtube', 'dailymotion', 'google_drive')
  },
  documentUrl: {
    type: DataTypes.STRING
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  duration: {
    type: DataTypes.INTEGER // Duration in minutes
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Content; 