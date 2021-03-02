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
        .then(() => res.status(201).json({ message : 'Félicitation vous êtes inscrit !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.authentification = (req, res, next) => {
    var cipher = crypto.createCipher('aes256', 'cleCryptage');
    var crypted = cipher.update(req.body.email,'utf8','hex');
    crypted += cipher.final('hex');
    utilisateur.findOne({ where: {email: crypted} })
    .then(user => {
        if(!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' })
        }
        bcrypt.compare(req.body.password, user.motdepasse)
        .then(valide => {
            if(!valide) {
                return res.status(401).json({ message: 'mot de passe incorrect' })
            }
            else {
                return res.status(200).json({
                    userid: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        'STRHCYSHFXGJCVHXXFGhsdfyhfcvhdfxcgf15242414hfcwgd',
                        { expiresIn: 86400 }
                    )
                });
            }
        })
        .catch(error => res.status(501).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};