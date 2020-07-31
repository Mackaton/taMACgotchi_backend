const { Router } = require('express');
const router = Router();

const QuestionsController = require('../controllers/question.controller')
const questionsController = new QuestionsController

//-----------------------------------------------------------------------//
//                              Routes Question
//-----------------------------------------------------------------------//

// GET
router.get('/questions', questionsController.getQuestions);

// POST
router.post('/create/questions', questionsController.postQuestion);

//router.post('/insert/questions', questionsController.insertQuestion);

// DELETE
router.delete('/delete/questions/:id', questionsController.deleteQuestion);

module.exports = router;