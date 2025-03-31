const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const QuizAttempt = sequelize.define('QuizAttempt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  answers: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Object mapping question IDs to answers'
  },
  results: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Array of objects containing question results'
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'QuizAttempts',
  timestamps: true,
  foreignKey: {
    name: 'QuizId',
    allowNull: false
  }
});

module.exports = QuizAttempt; 