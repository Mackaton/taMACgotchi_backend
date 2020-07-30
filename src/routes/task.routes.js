const { Router } = require('express');
const router = Router();

const TaskController = require('../controllers/task.controller');
const taskController = new TaskController();

//-----------------------------------------------------------------------//
//                              Routes Medals
//-----------------------------------------------------------------------//

// GET
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);

router.get('/challenges', taskController.getChallenges);
router.get('/challenges/:id', taskController.getChallengeById);

// UPDATE
router.put('/update/tasksandchallenges/:id', taskController.updateTaskOrChallenge);

// POST
router.post('/create/tasks', taskController.postTask);
router.post('/create/challenges', taskController.postChallenge);

// DELETE
router.delete('/delete/tasksandchallenges/:id', taskController.deleteTC);

//router.post('/insert/challenges', taskController.insertChallenges)

module.exports = router;
