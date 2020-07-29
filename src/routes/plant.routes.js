const { Router } = require('express');
const router = Router();

const PlantController = require('../controllers/plant.controller')
const plantController = new PlantController

//-----------------------------------------------------------------------//
//                              Routes Question
//-----------------------------------------------------------------------//

// GET Example
// router.get('/ruta', plantController.funcion);

module.exports = router;