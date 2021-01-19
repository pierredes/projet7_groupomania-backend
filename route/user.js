const express = require ('express');

const router = express.Router();

const userControlleur = require('../controleur/user');

router.get('/:id', userControlleur.recupererUnUtilisateur);
router.get('/', userControlleur.recupererTousLesUtilisateurs)
router.put('/modification/:id', userControlleur.modifierCompte);
router.delete('/supression/:id', userControlleur.supprimerCompte);

module.exports = router;