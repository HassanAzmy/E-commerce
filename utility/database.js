const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '01027112544', {
   dialect: 'mysql', 
   host: 'localhost'
});

module.exports = sequelize;