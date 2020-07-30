const User = require('../models/user.model');

class UserController {
	/* ================================ GETS ================================ */

	// all users
	async getUsers(req, res) {
		try {
			const users = await User.find({});
			res.status(200).send(users);
		} catch (error) {
			console.log(error);
		}
	}

	// specific user
	async getUser(req, res) {
		const { username } = req.params;
		console.log(username);
		try {
			const user = await User.find({ username: username });
			console.log(user);
			res.send(user);
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS =============================== */

	// create new user
	async createUser(req, res) {
		const { username, email, provider, name } = req.body;
		const user = new User({ username, email, provider, name });
		try {
			await user.save(function (err) {
				if (err) return res.status(400).json({ error: `Error en los datos del usuario` });
				res.status(200).json({ message: `Usuario ${username} creado exitosamente` });
			});
		} catch (error) {
			console.error(error);
		}
	}

	/* ================================ POSTS =============================== */

	// update user info
	async updateUser(req, res) {
		const { username } = req.params;
		const { name, forest, medals, task } = req.body;
		const query = { username: username };
		try {
			const user = await User.findOneAndUpdate(query, { forest }, function (err) {
				if (err) return res.status(400).json({ error: `Error en los datos del usuario` });
				res.status(200).json({ message: `Usuario ${username} actualizado exitosamente` });
			});
			console.log(user);
			res.send('ok');
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = UserController;
