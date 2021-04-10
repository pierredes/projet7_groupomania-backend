const utilisateur = require('../modele/user');
const post = require('../modele/post');
const commentaire = require('../modele/commentaire');
const jwt = require('jsonwebtoken');

exports.modifierCompte = (req, res, next) => {
    utilisateur.findOne({ where: {id: req.params.id} })
    .then(() => {
       utilisateur.update({ ...req.body })
       .then(user => {
           res.status(201).json({ message: 'Utilisateur modifié'})
       })
       .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.supprimerCompte = (req, res, next) => {
    utilisateur.findOne({ where: {id: jwt.decode(req.headers.authorization).userId} })
    .then(() => {
        commentaire.destroy({ where: {user_id: jwt.decode(req.headers.authorization).userId} })
        .then(() => {
            post.destroy({ where: {user_id: jwt.decode(req.headers.authorization).userId}})
            .then(() => {
                utilisateur.destroy({ where: {id: jwt.decode(req.headers.authorization).userId} })
            .then(() => {
                res.status(201).json({ message: 'Utilisateur supprimé' })
            })
            .catch(error => res.status(404).json({ error }));
            })
        })
    })
    .catch(error => res.status(404).json({ error }));
}

exports.recupererUnUtilisateur = (req, res, next) => {
    utilisateur.findOne({ where: {id: req.params.id} })
    .then(utilisateur => res.status(201).json({ utilisateur }))
    .catch(error => res.status(404).json({ error }));
}

exports.recupererTousLesUtilisateurs = (req, res, next) => {
    utilisateur.findAll()
    .then(utilisateur => res.status(201).json({ utilisateur }))
    .catch(error => res.status(404).json({ error }));
}



