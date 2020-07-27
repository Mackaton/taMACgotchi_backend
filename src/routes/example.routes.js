const { Router } = require('express');
const router = Router();

const ControllerMain = require('../controllers/example.controller')
const controller = new ControllerMain

//-----------------------------------------------------------------------//
//                              Routes Example
//-----------------------------------------------------------------------//


// GET Example
router.get('/', controller.example);

// POST Example
router.post('/post/example', controller.examplePost);

module.exports = router;