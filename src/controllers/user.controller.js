const User = require('../models/user.model');
const Plant = require('../models/plant.model');
const TestInitial = require('../models/test_initial.model');

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
		let type, state, lvl, test;
		try {
			// Obtain user info and check if he has a plant
			const userData = await User.findOne({ email: email });
			if (!userData) {
				return res.status(400).json({ message: `No existe un usuario registrado con el email ${email}` });
			}

			// Check if the user made the initial test
			const initTestUser = await TestInitial.findOne({ user: userData._id });
			if (initTestUser) {
				test = true
			} else {
				test = false
			}

			// Response User values (please we need to change the user schema model to add init test boolean )
			let user = {
				_id: userData._id,
				username: userData.username,
				email: userData.email,
				provider: userData.provider,
				name: userData.name,
				lastname: userData.lastname,
				tested: test,
				picture: userData.picture,
				carbon: userData.carbon,
				task_challenges: userData.task_challenges,
				friends: userData.friends,
				medals: userData.medals,
				forest: userData.forest,
				actualPlant: {},
				urlPicture: 'not plant available'
			};

			// Get actual active plant from the user
			const actualPlant = await Plant.findOne({ user: userData._id, forest: false }).populate('type', 'name');

			if (!actualPlant) {
				return res.status(200).json(user);
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
				const urlImage = `${picture}${type}${lvl}${state}.png`
				user.actualPlant = actualPlant
				user.urlPicture = urlImage
				return res.status(200).send(user);
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
