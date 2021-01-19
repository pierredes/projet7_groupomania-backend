const express = require('express');
const router = express.Router();

const authentification = require('../middleware/authentification');
const commentaireControlleur = require('../controleur/commentaire');

router.post('/', authentification, commentaireControlleur.creerComentaire);
router.put('/modifier/:id', authentification, commentaireControlleur.modifierUnCommentaire);
router.delete('/supprimer/:id', authentification, commentaireControlleur.supprimerUnCommentaire);
router.get('/:id', authentification, commentaireControlleur.afficherUnCommentaire);
router.get('/', authentification, commentaireControlleur.afficherTousLesCommentaire);

module.exports = router;