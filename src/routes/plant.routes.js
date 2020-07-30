const { Router } = require('express');
const router = Router();

const PlantController = require('../controllers/plant.controller')
const plantController = new PlantController

//-----------------------------------------------------------------------//
//                              Routes Question
//-----------------------------------------------------------------------//

router
    // GET actual plant user
    .get('/plant/:userId', plantController.userPlant)

    // GET All plants in forest owned by user
    .get('/forest/plant/:userId', plantController.userForestPlants);

// GET TEST
router.post('/start/new/plant', plantController.createPlant);

router.post('/plant/test/new', plantController.createPlantTest);



module.exports = router;