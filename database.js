const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
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