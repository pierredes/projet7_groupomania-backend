const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
    host: process.env.db_host,
    dialect: 'mysql',
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection à la base de données réussi');
    })
    .catch(erreur => {
        console.log('Connection à la base de donnée échoué', erreur);
    });

module.exports = sequelize;