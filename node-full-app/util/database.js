const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-play', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;