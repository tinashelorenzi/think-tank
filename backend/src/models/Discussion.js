const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Discussion = sequelize.define('Discussion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  replies: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastReply: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('active', 'locked', 'archived'),
    defaultValue: 'active'
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Discussion; 