const Challenge = require('../models/challenge.model');
const User = require('../models/user.model');

// ------------------------------------------------------------------------------------------------
// node: Despedida.
// ------------------------------------------------------------------------------------------------

// Intent name.
const action = 'estado_desafios';

// Node handler.
async function handler(req, res) {
	if (req.body.action === action) {
		let username;
		let challengesCompleted;
		let challengesActive = '';

		// Testing user
		if (req.body.username === null) username = 'victor';
		else username = req.body.username;

		const userData = await User.findOne({ username });
		if (!userData.challenges_completed) challengesCompleted = 'Todavía no tienes desafios completados.';

		const taskChallenges = await User.findOne({ username: username }).populate('task_challenges.task');

		let active = [];

		for (const task of taskChallenges.task_challenges) {
			if (task.tier !== 0 && task.status) {
				const challenge = await Challenge.findOne({ category: task.task.category, tier: task.tier });
				active.push(challenge._id);
			}
		}

		const challenges = await Challenge.find({ _id: active });

		// for (let i = 0; i < challenges.length; i++) {
		// challengesActive += `${challenges[i].category}: ${challenges[i].description}\n\n`;
		// }

		challenges.forEach(data => {
			challengesActive += `${data.category}: ${data.description}\n\n`;
		});

		let data = { challengesCompleted, challengesActive };
		res.status(200).send({ message: 'Done', data });
	}
}

module.exports = handler;
