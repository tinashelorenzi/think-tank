const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('multiple_choice', 'true_false', 'short_answer'),
    allowNull: false,
    defaultValue: 'multiple_choice'
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of options for multiple choice questions'
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Explanation of the correct answer'
  }
}, {
  tableName: 'Questions',
  timestamps: true,
  foreignKey: {
    name: 'QuizId',
    allowNull: false
  }
});

module.exports = Question; 