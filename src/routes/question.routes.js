const { Router } = require('express');
const router = Router();

const QuestionController = require('../controllers/questions.controller')
const questionController = new QuestionController

//-----------------------------------------------------------------------//
//                              Routes Question
//-----------------------------------------------------------------------//

// GET Example
// router.get('/ruta', questionController.funcion);

module.exports = router;