const Task = require('../models/task.model');
//const challenges = require('../filldb/insert_challenges');

class TaskController {

	/* ================================ GETS ================================ */

	// Get task by id
	async getTaskById(req, res) {
		try {
            const id_task_req = req.params.id;
			const task = await Task.find({ _id: id_task_req, challenge: false });
			res.send(task);
		} catch (error) {
			console.log(error);
		}
	}

	// Get all tasks
	async getTasks(req, res) {
		try {
			const tasks = await Task.find({ challenge: false });
			res.send(tasks);
		} catch (error) {
			console.log(error);
		}
	}

	// Get challenge by id
	async getChallengeById(req, res) {
		try {
            const id_task_req = req.params.id;
            const task = await Task.find({ _id: id_task_req, challenge: true });
			res.send(task);
		} catch (error) {
			console.log(error);
		}
	}

	//Get all challenges
	async getChallenges(req, res) {
		try {
			const tasks = await Task.find({ challenge: true });
			res.send(tasks);
		} catch (error) {
			console.log(error);
		}
	}

	/*async insertChallenges(req, res){
		try{
			await challenges.forEach(challenge => {
				challenge['challenge'] = true;
				var new_challenge = new Task(challenge);
				new_challenge.save(function (err){if (err) return console.error(err)})
			});
		}catch(error){
			console.log(error);
		}
	}*/

	/* ================================ PUTS ================================ */

	async updateTaskOrChallenge(req, res) {
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
			const { name, tier, value } = req.body;
			const task = new Task({ name, challenge: false, tier, value });
			await task.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Task ${name} creada correctamente` });
			});
		} catch (error) {
			console.log(error);
		}
	}

	async postChallenge(req, res) {
		try {
			const { name, tier, value } = req.body;
			const task = new Task({ name, challenge: true, tier, value });
			await task.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Challenge ${name} creada correctamente` });
			});
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ DELETE ================================ */

	async deleteTC(req, res) {
		try{
			const id_tc = req.params.id
			await Task.findByIdAndDelete(id_tc);
			res.status(200).json({ message: 'Task/Challenge eliminado correctamente'})
		} catch (error){
			console.log(error)
		}
	}

}

module.exports = TaskController;
