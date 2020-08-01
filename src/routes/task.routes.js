const { Router } = require('express');
const router = Router();

const TaskController = require('../controllers/task.controller');
const taskController = new TaskController();

//-----------------------------------------------------------------------//
//                              Routes Medals
//-----------------------------------------------------------------------//

// GET
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:username', taskController.getTasksByUsername);

// UPDATE
router.put('/update/tasks/:id', taskController.updateTask);

// POST
router.post('/create/tasks', taskController.postTask);

// DELETE
router.delete('/delete/tasks/:id', taskController.deleteTask);

//router.post('/insert/tasks', taskController.insertTasks)

module.exports = router;
