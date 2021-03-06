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
router.get('/medals/user/:username', medalController.getMedalsByUsername);

// UPDATE
router.put('/update/medals/:id', medalController.updateMedal);

// POST
router.post('/create/medals', medalController.postMedal);

// DELETE
router.delete('/delete/medals/:id', medalController.deleteMedal);

//router.post('/insert/medals', medalController.insertMedals)

module.exports = router;
