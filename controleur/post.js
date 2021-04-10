const commentaire = require('../modele/commentaire');
const post = require('../modele/post');
const utilisateur = require ('../modele/user');
const jwt = require('jsonwebtoken');

exports.creationPost = (req, res, next) => {
    post.create({
        titre: req.body.titre,
        sujet: req.body.sujet,
        contenu: req.body.contenu,
        user_id: jwt.decode(req.headers.authorization).userId
    })
    .then(() => res.status(201).json({ message: 'post créé' }))
    .catch(erreur => res.status(400).json({ erreur }))
}

exports.modificationPost = (req, res, next) => {
    post.findOne({ where: {id: req.params.id} })
    .then((post) => {
        if(post.user_id == jwt.decode(req.headers.authorization).userId) {
            post.update({
                titre: req.body.titre,
                sujet: req.body.sujet,
                contenu: req.body.contenu,
            },
            {
                where: {id : req.params.id}
            })
           .then(() => {
               res.status(201).json({ message: 'post modifié'})
           })
           .catch(error => res.status(404).json({ message: 'blablabla' + error }));
        } else {
            return res.status(400).json({ message: "Vous n'êtes pas l'auteur de l'article donc vous ne pouvez pas le modifier"})
        }
    })
    .catch(error => res.status(404).json({ error }));
}

exports.supressionPost = (req, res, next) => {
    post.findOne({ where: {id: req.params.id} })
    .then((post) => {
        if(post.user_id == jwt.decode(req.headers.authorization).userId || jwt.decode(req.headers.authorization).isAdmin == true) {
            commentaire.destroy({ where: {post_id: req.params.id}})
            .then(() => {
                post.destroy({ where: {id: req.params.id} })
                .then(() => {
                    res.status(201).json({ message: 'post supprimé' })
                })
                .catch(error => res.status(404).json({ error }));
            })
        } else {
            return res.status(400).json({ message: "Vous n'êtes pas l'auteur de l'article donc vous ne pouvez pas le supprimer"})
        }
    })
    .catch(error => res.status(404).json({ error }));
}

exports.recuperationUnPost = (req, res, next) => {
    post.findOne({ where: {id: req.params.id} })
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(404).json({ error }));
}

exports.recuperationTousLesPost = (req, res, next) => {
    post.findAll({order : [['updatedAt', 'DESC']], include: [{model: utilisateur}]})
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(404).json({ error }));
}