const User = require('../models/user.model');

// ------------------------------------------------------------------------------------------------
// node: Bienvenida.
// ------------------------------------------------------------------------------------------------

// Intent name.
const action = 'bienvenido';

// Node handler.
async function handler(req, res) {
	if (req.body.action === action) {
		let username;

		// Testing user
		if (req.body.username === null) username = 'victor';
		else username = req.body.username;

		const userData = await User.findOne({ username });

		let data = { name: userData.name };
		res.status(200).send({ message: 'Done', data });
	}
}

module.exports = handler;
