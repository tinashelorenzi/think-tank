const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  textSubmission: {
    type: DataTypes.TEXT
  },
  fileUrl: {
    type: DataTypes.STRING
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  grade: {
    type: DataTypes.INTEGER
  },
  feedback: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('draft', 'submitted', 'graded', 'returned'),
    defaultValue: 'draft'
  },
  lateSubmission: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pointsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Submission; 