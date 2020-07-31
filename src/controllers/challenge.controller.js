const Challenge = require('../models/challenge.model');
const User = require('../models/user.model');
//const challenges = require('../filldb/insert_challenges');

class ChallengeController {

	/* ================================ GETS ================================ */

	// Get challenge by id
	async getChallengeById(req, res) {
		try {
            const id_challenge_req = req.params.id;
            const challenge = await Challenge.findById(id_challenge_req);
			res.send(challenge);
		} catch (error) {
			console.log(error);
		}
    }
    
    // Get challenge by username
	async getChallengeByUsername(req, res) {
		try {
            const username = req.params.username;
			const user = await User.findOne({username: username});

			var active = [];

			// Search tasks inactives by user
			user.task_challenges.forEach(async task => {
				if (task.tier !== 0 && task.status){
                    const challenge = await Challenge.findOne({category: task.category, tier: task.tier});
                    active.push(challenge._id);
                }
			});

            const challenges = await Challenge.find({ _id: active });
			res.send(challenges)
		} catch (error) {
			console.log(error);
		}
	}

	//Get all challenges
	async getChallenges(req, res) {
		try {
			const challenges = await Challenge.find();
			res.send(challenges);
		} catch (error) {
			console.log(error);
		}
	}

	/*async insertChallenges(){
		try{
			await challenges.forEach(challenge => {
				var new_challenge = new Challenge(challenge);
				new_challenge.save(function (err){if (err) return console.error(err)})
			});
		}catch(error){
			console.log(error);
		}
	}*/

	/* ================================ PUTS ================================ */

	async updateChallenge(req, res) {
		try {
            const id_challenge_req = req.params.id;
            const challenge_req = req.body;
            const challenge = await Challenge.findByIdAndUpdate(id_challenge_req, challenge_req);
            res.send(challenge)
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS ================================ */

	async postChallenge(req, res) {
		try {
			const { category, description, tier, duration, value } = req.body;
			const challenge = new Challenge({ category, description, tier, duration, value });
			await challenge.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Challenge ${description} creada correctamente` });
			});
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ DELETE ================================ */

	async deleteChallenge(req, res) {
		try{
			const id_tc = req.params.id
			await Challenge.findByIdAndDelete(id_tc);
			res.status(200).json({ message: 'Challenge/Challenge eliminado correctamente'})
		} catch (error){
			console.log(error)
		}
	}

}

module.exports = ChallengeController;
