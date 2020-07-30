const User = require('../models/user.model');
const Plant = require('../models/plant.model');

const picture = 'https://storagepictures-cos-standard-37s.s3.us-south.cloud-object-storage.appdomain.cloud/';

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
		const { email } = req.params;
		let type, state, lvl;
		try {
			// Obtain user info and check if he has a plant
			const user = await User.findOne({ email: email });
			if (!user) {
				return res.status(400).json({message: `No existe un usuario registrado con el email ${email}`})
			}
			const actualPlant = await Plant.findOne({ user: user._id, forest: false }).populate('type', 'name');

			if (!actualPlant) {
				return res.status(200).send(user)
			} else {
				// Picture URL
				type = actualPlant.type.name;
				lvl = actualPlant.level;
				if (actualPlant.health == true) {
					// Good
					state = 'G';
				} else {
					// Bad
					state = 'B';
				}
				const userPlant = {
					user,
					actualPlant,
					urlPicture: `${picture}${type}${lvl}${state}.png`,
				};
				return res.status(200).send(userPlant)
			}

		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS =============================== */

	// create new user
	async createUser(req, res) {
		const { username, email, provider, name, lastname } = req.body;
		const user = new User({ username, email, provider, name, lastname });
		try {
			await user.save(function (err) {
				if (err) return res.status(400).json({ error: `Error en los datos del usuario` });
				res.status(200).json({ message: `Usuario ${username} creado exitosamente` });
			});
		} catch (error) {
			console.error(error);
		}
	}

	/* ================================ PUTS =============================== */

	// update user info DEVELOPER USE
	async updateUser(req, res) {
		const { username } = req.params;
		const { forest } = req.body;
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
