const express = require('express');
const bodyParser = require('body-parser');

const utilisateur = require('./modele/user');
const post = require('./modele/post');
const commentaire = require('./modele/commentaire');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

const authentificationRoute = require('./route/authentification');
const userRoute = require('./route/user');
const postRoute = require('./route/post');
const commentaireRoute = require('./route/commentaire');

app.use('/api/authentification', authentificationRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/commentaire', commentaireRoute);

// relation entre les tables
utilisateur.hasMany(post);
post.hasMany(commentaire);
post.belongsTo(utilisateur, {foreignKey: {name: 'user_id', allowNull: false}});
commentaire.belongsTo(utilisateur, {foreignKey: 'user_id'});
commentaire.belongsTo(post, {foreignKey: 'post_id'});



module.exports = app;