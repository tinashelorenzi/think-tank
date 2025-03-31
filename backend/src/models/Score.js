const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Score = sequelize.define('Score', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  activityType: {
    type: DataTypes.ENUM('quiz', 'assignment', 'participation', 'attendance', 'achievement'),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  metadata: {
    type: DataTypes.JSON
  }
});

module.exports = Score; 