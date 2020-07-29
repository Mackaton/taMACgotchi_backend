const { Router } = require('express');
const router = Router();

const MedalController = require('../controllers/medal.controller')
const medalController = new MedalController

//-----------------------------------------------------------------------//
//                              Routes Medals
//-----------------------------------------------------------------------//

// GET
router.get('/medals', medalController.getMedals);
router.get('/medals/:id', medalController.getMedalsById);

// UPDATE
router.put('/update/medals/:id', medalController.updateMedal)

// POST
router.post('/create/medals', medalController.postMedal)

module.exports = router;
