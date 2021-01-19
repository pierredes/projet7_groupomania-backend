const utilisateur = require('../modele/user')

exports.modifierCompte = (req, res, next) => {
    utilisateur.findOne({ where: {id: req.params.id} })
    .then(() => {
       utilisateur.update({ ...req.body })
       .then(user => {
           res.status(201).json({ message: 'utilisateur modifié'})
       })
       .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.supprimerCompte = (req, res, next) => {
    utilisateur.findOne({ where: {id: req.params.id} })
    .then(() => {
        utilisateur.destroy({ where: {id: req.params.id} })
        .then(() => {
            res.status(201).json({ message: 'utilisateur supprimé' })
        })
        .catch(error => res.status(404).json({ error }));
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

exports.recupererTousLesUtilisateursEnLigne = (req, res, next) => {
    res.status(201).json( {message: 'Recup de compte'} )
}



