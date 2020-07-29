const { Router } = require('express');
const router = Router();

const PlantTypeController = require('../controllers/plant_type.controller')
const plantTypeController = new PlantTypeController

//-----------------------------------------------------------------------//
//                              Routes PlantType
//-----------------------------------------------------------------------//

// GET Example
// router.get('/ruta', plantTypeController.funcion);

module.exports = router;