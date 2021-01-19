const express = require('express');

const router = express.Router();

const authentification = require('../middleware/authentification');
const postControleur = require('../controleur/post');

router.post('/', authentification, postControleur.creationPost);
router.put('/modification/:id', authentification, postControleur.modificationPost);
router.delete('/supression/:id', authentification, postControleur.supressionPost);
router.get('/', authentification, postControleur.recuperationTousLesPost);
router.get('/:id', authentification, postControleur.recuperationUnPost);

module.exports = router;