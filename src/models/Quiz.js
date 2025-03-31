const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quiz = sequelize.define('Quiz', {
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
  questions: {
    type: DataTypes.JSON,
    allowNull: false
  },
  timeLimit: {
    type: DataTypes.INTEGER // Time limit in minutes
  },
  maxPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  passingScore: {
    type: DataTypes.INTEGER,
    defaultValue: 70
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  allowRetake: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  maxAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  showAnswers: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  shuffleQuestions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Quiz; 