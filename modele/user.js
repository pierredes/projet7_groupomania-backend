const sequelize = require('../database');
const Sequelize = require('sequelize');


const utilisateur = sequelize.define('utilisateur', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    nom: {type: Sequelize.STRING(255), allowNull: false},
    prenom: {type: Sequelize.STRING(255), allowNull: false},
    poste: {type: Sequelize.STRING(255), allowNull: false},
    email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
    motdepasse: {type: Sequelize.STRING(255), allowNull: false},
});

// sequelize.sync({ force: true });

module.exports = utilisateur;