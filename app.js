const express = require('express');
const bodyParser = require('body-parser');

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


module.exports = app;