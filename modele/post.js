const sequelize = require('../database');
const Sequelize = require('sequelize');


const post = sequelize.define('post', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    titre: {type: Sequelize.STRING(255), allowNull: false},
    sujet: {type: Sequelize.STRING(255), allowNull: false},
    contenu: {type: Sequelize.TEXT, allowNull: false},
});

sequelize.sync();

module.exports = post;