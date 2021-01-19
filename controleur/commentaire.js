const commentaire = require('../modele/commentaire')

exports.creerComentaire = (req, res, next) => {
    commentaire.create({
        contenu: req.body.contenu
    })
    .then(() => res.status(201).json({ message: 'commentaire créer' }))
    .catch(erreur => res.status(400).json({ erreur }))
}

exports.modifierUnCommentaire = (req, res, next) => {
    commentaire.findOne({ where: {id: req.params.id} })
    .then(() => {
       commentaire.update({ 
            contenu: req.body.contenu
        })
       .then(() => {
           res.status(201).json({ message: 'commentaire modifié'})
       })
       .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.supprimerUnCommentaire = (req, res, next) => {
    commentaire.findOne({ where: {id: req.params.id} })
    .then(() => {
        commentaire.destroy({ where: {id: req.params.id} })
        .then(() => {
            res.status(201).json({ message: 'commentaire supprimé' })
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.afficherUnCommentaire = (req, res, next) => {
    commentaire.findOne({ where: {id: req.params.id} })
    .then(commentaire => res.status(201).json({ commentaire }))
    .catch(error => res.status(404).json({ error }));
}

exports.afficherTousLesCommentaire = (req, res, next) => {
    commentaire.findAll()
    .then(commentaire => res.status(201).json({ commentaire }))
    .catch(error => res.status(404).json({ error }));
}