const TypePlant = require('../models/plant_type.model');

class TypePlantController {
	/* ================================ GETS ================================ */

	// obtains all types plants
	async getTypesPlants(req, res) {
		try {
			const typesPlants = await TypePlant.find({});
			res.status(200).send(typesPlants);
		} catch (error) {
			console.log(error);
		}
	}

	// obtain specific type plant
	async getTypePlant(req, res) {
		const { name } = req.params;
		console.log(name);
		try {
			const typePlant = await TypePlant.find({ name: name });
			res.send(typePlant);
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS =============================== */

	// create new user
	async createTypePlant(req, res) {
		const { name, legendary } = req.body;
		const newType = new TypePlant({ name, legendary });
		try {
			await newType.save(function (err) {
				if (err) return res.status(400).json({ error: `Error en los datos ingresados` });
				res.status(200).json({ message: `Planta ${name} creada exitosamente` });
			});
		} catch (error) {
			console.error(error);
		}
	}

}

module.exports = TypePlantController;
