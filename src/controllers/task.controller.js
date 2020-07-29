const Task = require('../models/task.model');

class TaskController {
	async getTaskById(req, res) {
		try {
            const id_task_req = req.params.id;
            const task = await Task.findById(id_task_req);
			res.send(task);
		} catch (error) {
			console.log(error);
		}
	}

	async getTasks(req, res) {
		try {
			const tasks = await Task.find();
			res.send(tasks);
		} catch (error) {
			console.log(error);
		}
	}

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

	async postTask(req, res) {
		try {
			const { name, challenge, tier, value } = req.body;
			const task = new Task({ name, challenge, tier, value });
			await task.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Task ${name} creada correctamente` });
			});
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = TaskController;
