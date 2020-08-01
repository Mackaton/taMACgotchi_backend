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


router
    // POST start new plant
    .post('/start/new/plant', plantController.createPlant)

    // [DEVELOPER] POST create new plant to start
    .post('/plant/test/new', plantController.createPlantTest);

router
    // PUT update actual plant to forest
    .put('/update/plant/:plantId', plantController.movePlantToForest)

module.exports = router;