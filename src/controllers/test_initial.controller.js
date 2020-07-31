const TestInitial = require('../models/test_initial.model');
const User = require('../models/user.model');
const Task = require('../models/task.model');

class TestInitialController {

	/* ================================ GETS ================================ */

	// Get test by username
	async getTestByUsername(req, res) {
		try {
            const username = req.params.username;
			const user = await User.findOne({username: username});
            var test = await TestInitial.findOne({user: user._id}).populate([{path:'user',select:'username'}, {path:'results.0.id_question',select:'description'}]).exec();
			res.send(test)
		} catch (error) {
			console.log(error);
		}
	}

	// Get all tests
	async getTests(req, res) {
		try {
			const tests = await TestInitial.find().populate([{path:'user',select:'username'}, {path:'results.id_question',select:'description'}]).exec();
			res.send(tests);
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ PUTS ================================ */

	async updateTest(req, res) {
		try {
            const username = req.params.username;
            const id_req = await User.findOne({username: username});
            const id = id_req._id;
            const test_req = req.body;
            const test = await TestInitial.findOneAndUpdate({user: id}, test_req );
            res.send(test);
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS ================================ */

	async postTest(req, res) {
		try {
			const { username, results } = req.body;
			const [user] = await User.find({username: username});

			// Validacion
			const validation = await TestInitial.find({user: user});
			if (validation.length > 0) return res.status(400).json({ error: `El usuario ${username} ya completo el test inicial` });

			// Carbon Prom
			var promCarbon = 0;
			results.forEach(result => {
				promCarbon += result.value;
			});

			// Tasks prom
			const tasks = await Task.find();
			var tasks_challenges = [];
			tasks.forEach( task => {
				var promTest = 0
				if (task.index === results.find(result => task.question.equals(result.id_question)).index){
					promTest = 1;
				}
				tasks_challenges.push({task: task._id, prom: promTest})
			});

			// User update
			//user.carbon.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)); 
			await User.findByIdAndUpdate(user._id, {$push: {carbon: {value: promCarbon + 7, date: new Date()}}, task_challenges: tasks_challenges})

            const test = new TestInitial({ user: user._id, date: new Date(), results: results, prom_carbon: promCarbon});
			await test.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Test Inicial del usuario ${username} ha sido creada correctamente` });
			});
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ DELETE ================================ */

	async deleteTest(req, res) {
		try{
            const username = req.params.username;
            const user = await User.findOne({username: username});
			await TestInitial.deleteOne({user: user._id});
			res.status(200).json({ message: 'Test eliminado correctamente'})
		} catch (error){
			console.log(error)
		}
    }
}

module.exports = TestInitialController;