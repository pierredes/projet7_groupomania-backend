const post = require('../modele/post');
const utilisateur = require ('../modele/user');

exports.creationPost = (req, res, next) => {
    post.create({
        titre: req.body.titre,
        sujet: req.body.sujet,
        contenu: req.body.contenu,
        user_id: req.body.user_id
    })
    .then(() => res.status(201).json({ message: 'post créer' }))
    .catch(erreur => res.status(400).json({ erreur }))
}

exports.modificationPost = (req, res, next) => {
    // post.findOne({ where: {id: req.params.id} })
    // .then(() => {
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
    // })
    // .catch(error => res.status(404).json({ error }));
}

exports.supressionPost = (req, res, next) => {
    post.findOne({ where: {id: req.params.id} })
    .then(() => {
        post.destroy({ where: {id: req.params.id} })
        .then(() => {
            res.status(201).json({ message: 'post supprimé' })
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.recuperationUnPost = (req, res, next) => {
    post.findOne({ where: {id: req.params.id} })
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(404).json({ error }));
}

exports.recuperationTousLesPost = (req, res, next) => {
    post.findAll({include: [{model: utilisateur}]})
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(404).json({ error }));
}