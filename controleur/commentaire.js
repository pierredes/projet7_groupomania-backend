const commentaire = require('../modele/commentaire');
const utilisateur = require('../modele/user');
const post = require('../modele/post')

exports.creerComentaire = (req, res, next) => {
    commentaire.create({
        contenu: req.body.contenu,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé' }))
    .catch(erreur => res.status(400).json({ erreur }))
}

exports.modifierUnCommentaire = (req, res, next) => {
    commentaire.findOne({ where: {id: req.params.id} })
    .then(() => {
       commentaire.update({ 
            contenu: req.body.contenu
        })
       .then(() => {
           res.status(201).json({ message: 'Commentaire modifié'})
       })
       .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.supprimerUnCommentaire = (req, res, next) => {
    commentaire.findOne({ where: {id: req.params.id} })
    .then(() => {
        if(req.body.admin == true) {
            commentaire.destroy({ where: {id: req.params.id} })
            .then(() => {
                res.status(201).json({ message: 'Commentaire supprimé' })
            })
            .catch(error => res.status(404).json({ error }));
        } else {
            return res.status(400).json({ message: "Seul un administrateur peut supprimer les commentaires ! "})
        }
        
    })
    .catch(error => res.status(404).json({ error }));
}

exports.afficherUnCommentaire = (req, res, next) => {
    commentaire.findAll({include: [{model: post, where: {id: req.params.id}}, {model: utilisateur} ]})
    .then(commentaire => res.status(200).json({ commentaire }))
    .catch(error => res.status(404).json({ error }));
}

exports.afficherTousLesCommentaire = (req, res, next) => {
    commentaire.findAll()
    .then(commentaire => res.status(200).json({ commentaire }))
    .catch(error => res.status(404).json({ error }));
}