const express = require ('express');

const router = express.Router();

const userControlleur = require('../controleur/user');
const authentification = require('../middleware/authentification');


router.get('/:id' , userControlleur.recupererUnUtilisateur);
router.get('/', authentification , userControlleur.recupererTousLesUtilisateurs)
router.put('/modification/:id', authentification , userControlleur.modifierCompte);
router.delete('/supression/:id', authentification , userControlleur.supprimerCompte);

module.exports = router;