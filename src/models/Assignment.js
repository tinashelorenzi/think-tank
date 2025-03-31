const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Assignment = sequelize.define('Assignment', {
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
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  maxPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  submissionType: {
    type: DataTypes.ENUM('text', 'file', 'both'),
    defaultValue: 'text'
  },
  allowedFileTypes: {
    type: DataTypes.STRING // Comma-separated list of allowed file extensions
  },
  maxFileSize: {
    type: DataTypes.INTEGER // In bytes
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rubric: {
    type: DataTypes.TEXT // JSON string of grading criteria
  },
  instructions: {
    type: DataTypes.TEXT
  }
});

module.exports = Assignment; 