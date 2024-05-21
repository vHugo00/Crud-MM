const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./User')(sequelize, Sequelize);

module.exports = db;
