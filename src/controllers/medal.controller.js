const Medals = require('../models/medals.model');
const Task = require('../models/task.model');
const User = require('../models/user.model');
//const medals = require('../filldb/insert_medals');

const picture = 'https://storagepictures-cos-standard-37s.s3.us-south.cloud-object-storage.appdomain.cloud';
class MedalsController {

	/* ================================ GETS ================================ */

	// Get medal by id
	async getMedalsById(req, res) {
		try {
            const id_medals_req = req.params.id;
			const medals = await Medals.findById(id_medals_req).populate('challenge');
			res.send(medals)
		} catch (error) {
			console.log(error);
		}
	}

	async getMedalsByUsername(req, res) {
		try {
            const username = req.params.username;
			const user = await User.findOne({username: username});

			var medals = [];

			// Search medals by user
			
			for (const medal of user.medals){
                medals.push(medal);
			}

			const medals_user = await Medals.find({ _id: medals});
			
			let new_json = [];
			for (const medal of medals_user){
                new_json.push({name: medal.name, pictureurl: `${picture}/${medal.name}.png`});
			}
			res.send(new_json);
		} catch (error) {
			console.log(error);
		}
	}

	// Get all medals
	async getMedals(req, res) {
		try {
			const medals = await Medals.find().populate('challenge');
			res.send(medals);
		} catch (error) {
			console.log(error);
		}
	}

	/*async insertMedals(){
		try{
			await medals.forEach(medal => {
				var new_medal = new Medals(medal);
				new_medal.save(function (err){if (err) return console.error(err)})
			});
		}catch(error){
			console.log(error);
		}
	}*/
	
	/* ================================ PUTS ================================ */

	async updateMedal(req, res) {
		try {
			const id_medals_req = req.params.id;
			const medal_req = req.body;
			const medals = await Medals.findByIdAndUpdate(id_medals_req, medal_req);
			res.send(medals);
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS ================================ */

	async postMedal(req, res) {
		try {
			const { name, id_challenge } = req.body;
			const task = await Task.findById(id_challenge);
			const medal = new Medals({ name: name, challenge: task });
			await medal.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Medals ${name} creada correctamente` });
			});
			
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ DELETE ================================ */

	async deleteMedal(req, res) {
		try{
			const id_medal = req.params.id
			await Medals.findByIdAndDelete(id_medal);
			res.status(200).json({ message: 'Medal eliminado correctamente'})
		} catch (error){
			console.log(error)
		}
	}
}

module.exports = MedalsController;
