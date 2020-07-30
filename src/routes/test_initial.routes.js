const { Router } = require('express');
const router = Router();

const TestInitialController = require('../controllers/test_initial.controller')
const testInitialController = new TestInitialController

//-----------------------------------------------------------------------//
//                              Routes Medals
//-----------------------------------------------------------------------//

// GET
router.get('/tests', testInitialController.getTests);
router.get('/tests/:username', testInitialController.getTestByUsername);

// UPDATE
router.put('/update/tests/:username', testInitialController.updateTest)

// POST
router.post('/create/tests', testInitialController.postTest)

// DELETE
router.delete('/delete/tests/:username', testInitialController.deleteTest);

module.exports = router;
