const { Router } = require('express');
const router = Router();

const PlantTypeController = require('../controllers/plant_type.controller');
const plantTypeController = new PlantTypeController();

//-----------------------------------------------------------------------//
//                              Routes PlantType
//-----------------------------------------------------------------------//

router

	// GET all types plants
	.get('/typesplants', plantTypeController.getTypesPlants)

	//GET specific type plant
	.get('/typeplant/:name', plantTypeController.getTypePlant);

// POST create new type plant
router.post('/create/typeplant', plantTypeController.createTypePlant);

module.exports = router;
