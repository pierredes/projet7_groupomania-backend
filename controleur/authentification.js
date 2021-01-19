const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const utilisateur = require('../modele/user');


exports.creationCompte = (req, res, next) => {
    var cipher = crypto.createCipher('aes256', 'cleCryptage');
    var crypted = cipher.update(req.body.email,'utf8','hex');
    crypted += cipher.final('hex');
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        utilisateur.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            poste: req.body.poste,
            email: crypted,
            motdepasse: hash
        })    
        .then(() => res.status(201).json({ message : 'utilisateur crée !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.authentification = (req, res, next) => {
    utilisateur.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ erreur: 'Utilisateur non trouvé' })
        }
        bcrypt.compare(req.body.password, utilisateur.motdepasse)
        .then(valide => {
            if(!valide) {
                return res.status(401).json({ erreur: 'mot de passe incorrect' })
            }
            else {
                res.status(200).json({
                    userid: utilisateur.id,
                    token: jwt.sign(
                        { userid: utilisateur.id },
                        'STRHCYSHFXGJCVHXXFGhsdfyhfcvhdfxcgf15242414hfcwgd',
                        { expiresIn: '24h' }
                    )
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};