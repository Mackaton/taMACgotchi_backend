const Medals = require('../models/medals.model');
const Task = require('../models/task.model');

class MedalsController {
	async getMedalsById(req, res) {
		try {
            const id_medals_req = req.params.id;
			const medals = await Medals.findById({ id_medals_req });
			res.send(medals);
		} catch (error) {
			console.log(error);
		}
	}

	async getMedals(req, res) {
		try {
			const medals = await Medals.find();
			res.send(medals);
		} catch (error) {
			console.log(error);
		}
	}

	async updateMedal(req, res) {
		try {
            const id_medals_req = req.params.id;
            console.log(req.body);
			const medals = await Medals.findById({ id_medals_req });
			res.send(medals);
		} catch (error) {
			console.log(error);
		}
	}

	async postMedal(req, res) {
		try {
			const { name, id_task_req } = req.body;
			const task = Task.findById(id_task_req);
			const medal = new Medals({ name: name, challenge: task });
			await medal.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Medals ${name} creada correctamente` });
			});
			
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = MedalsController;
