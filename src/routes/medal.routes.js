const { Router } = require('express');
const router = Router();

const MedalController = require('../controllers/medal.controller')
const medalController = new MedalController

//-----------------------------------------------------------------------//
//                              Routes Medals
//-----------------------------------------------------------------------//

// GET Example
// router.get('/ruta', medalController.funcion);

module.exports = router;
