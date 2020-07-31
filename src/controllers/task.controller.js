const Task = require('../models/task.model');
const User = require('../models/user.model');
//const tasks = require('../filldb/insert_tasks');

class TaskController {

	/* ================================ GETS ================================ */

	// Get task by id
	async getTaskById(req, res) {
		try {
            const id_task_req = req.params.id;
			const task = await Task.findById(id_task_req);
			res.send(task);
		} catch (error) {
			console.log(error);
		}
	}

	// Get all tasks
	async getTasks(req, res) {
		try {
			const tasks = await Task.find();
			res.send(tasks);
		} catch (error) {
			console.log(error);
		}
	}

	async getTasksByUsername(req, res) {
		try {
            const username = req.params.username;
			const user = await User.findOne({username: username});

			var inactive = [];

			// Search tasks inactives by user
			user.task_challenges.forEach(task => {
				if (task.status === false || task.checkday) inactive.push(task.task);
			});

            const tasks = await Task.find({ _id: {$nin : inactive} });
			res.send(tasks)
		} catch (error) {
			console.log(error);
		}
	}

	/*async insertTasks(){
		try{
			await tasks.forEach(task => {
				var new_task = new Task(task);
				new_task.save(function (err){if (err) return console.error(err)})
			});
		}catch(error){
			console.log(error);
		}
	}*/

	/* ================================ PUTS ================================ */

	async updateTask(req, res) {
		try {
            const id_task_req = req.params.id;
            const task_req = req.body;
            const task = await Task.findByIdAndUpdate(id_task_req, task_req);
            res.send(task)
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS ================================ */

	async postTask(req, res) {
		try {
			const { category, description, question, value } = req.body;
			const task = new Task({ category, description, question, value });
			await task.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Task ${description} creada correctamente` });
			});
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ DELETE ================================ */

	async deleteTask(req, res) {
		try{
			const id_task = req.params.id
			await Task.findByIdAndDelete(id_task);
			res.status(200).json({ message: 'Task eliminado correctamente'})
		} catch (error){
			console.log(error)
		}
	}

}

module.exports = TaskController;
