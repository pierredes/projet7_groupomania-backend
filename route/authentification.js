const express = require('express');

const router = express.Router();

const authentificationControlleur = require('../controleur/authentification');

router.post('/connection', authentificationControlleur.authentification);
router.post('/enregistrement', authentificationControlleur.creationCompte);



module.exports = router;
