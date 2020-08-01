const User = require('../models/user.model');
const Plant = require('../models/plant.model');

// ------------------------------------------------------------------------------------------------
// node: Estado Planta
// ------------------------------------------------------------------------------------------------

// Intent name.
const action = 'estado_planta';

// Node handler.
async function handler(req, res) {
	if (req.body.action === action) {
		let username;

		// Testing user
		if (req.body.username === null) username = 'victor';
		else username = req.body.username;

		const userData = await User.findOne({ username });

		// Get actual active plant from the user
		const actualPlant = await Plant.findOne({ user: userData._id, forest: false }).populate('type', 'name');

		let data = { health: actualPlant.health };
		res.status(200).send({ message: 'Done', data });
	}
}

module.exports = handler;
