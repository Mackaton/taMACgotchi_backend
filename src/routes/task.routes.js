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

// UPDATE
router.put('/update/tasks/:id', taskController.updateTask);

// POST
router.post('/create/tasks', taskController.postTask);

module.exports = router;
