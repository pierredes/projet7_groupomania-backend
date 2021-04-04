const sequelize = require('../database');
const Sequelize = require('sequelize');


const commentaire = sequelize.define('commentaire', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    contenu: {type: Sequelize.TEXT, allowNull: false},
});

sequelize.sync();

module.exports = commentaire;