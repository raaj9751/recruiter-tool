// sequelize.js

const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database connection parameters
const sequelize = new Sequelize('mvlxhrmg', 'mvlxhrmg', 'PxITGEEruL-Uty_q8v27PKtoPfMJ0s-w', {
  host: 'drona.db.elephantsql.com',
  dialect: 'postgres' // Or 'postgres', 'sqlite', 'mssql', depending on your database
});

module.exports = sequelize;
