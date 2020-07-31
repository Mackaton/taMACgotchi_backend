const User = require('../models/user.model');
const Plant = require('../models/plant.model');
const TestInitial = require('../models/test_initial.model');
const Task = require('../models/task.model');
const Challenge = require('../models/challenge.model');

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

	// all users
	async userMedals(req, res) {
		const { email } = req.params
		try {
			const userMedals = await User.findOne({email: email}, 'medals');
			res.status(200).send(userMedals.medals);
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

	// update user tasks info
	async updateUserTask(req,res){
		const username = req.params.username;
		const { id_task, check } = req.body;
		const query = { username: username }
		try{
			const user = await User.findOne(query);
			const task = await Task.findById(id_task);
			//const challenge = await Challenge.findOne({category: task.category, tier: user.})

			var new_task_challenge = user.task_challenges;
			var task_challenge = null;
			var index_task = 0;

			console.log(new_task_challenge);

			new_task_challenge.forEach((task_c, index) =>{
				if (task_c.task.equals(id_task)) {
					task_challenge = task_c;
					index_task = index;
				} 
			})

			if (task_challenge !== null) {
				var tier = 1;
				if (task_challenge.tier !== 0) tier = task_challenge.tier;
				else task_challenge.tier = 1;
				const actual_tier = await Challenge.findOne({category: task.category, tier: tier});
				if (task_challenge.days === 0) task_challenge.date = new Date();
				if (task_challenge.days + 1 !== actual_tier.duration){
					task_challenge.days += 1;
					task_challenge.checkday = check;
				}else{		
					await User.findByIdAndUpdate(user._id, {$push: {challenges_completed: actual_tier._id}})
					const new_tier = await Challenge.find({category: task.category, tier: tier + 1});
					if (new_tier.length > 0) {
						task_challenge.days += 1;
						task_challenge.tier += 1;
						task_challenge.checkday = check;
					} else{
						task_challenge.status = false;
					}
				}
			}

			new_task_challenge[index_task] = task_challenge;
			
			await User.findByIdAndUpdate(user._id, {task_challenges: new_task_challenge});
			res.send('ok');
		} catch (error){
			console.error(error);
		}
	}

	async updateCarbon(){
		try{
			const users = await User.find().populate('challenges_completed');

			users.forEach( async user => {
				
				let task_challenges = user.task_challenges;
				var carbon = 0;
				var achievement_carbon = 0;
				var new_task = [];
				
				
				for (const task_challenge of task_challenges){

					const task = await Task.findById(task_challenge.task);

					if (task_challenge.checkday){
						task_challenge.checkday = null;
						task_challenge.prom = (task_challenge.prom * 29/30) + 1/30;
						carbon += task.value * task_challenge.prom;
					} else if (task_challenge.checkday === false){
						task_challenge.checkday = null;
						task_challenge.prom = task_challenge.prom * 29/30;
						carbon += task.value * task_challenge.prom;
					} else{
						if (task_challenge.days !== 0) {
							task_challenge.days = 0;
							task_challenge.date = new Date();
						}
					}
					new_task.push(task_challenge);
				}

				user.challenges_completed.forEach(challenge =>{
					achievement_carbon += challenge.value;
				});
				carbon += 7 + achievement_carbon;
				await User.findByIdAndUpdate(user._id, {$push: {carbon: {value: carbon, date: new Date()}}, task_challenges: new_task})
			});
		}catch(error){
			console.error(error);
		}
	}
}

module.exports = UserController;
