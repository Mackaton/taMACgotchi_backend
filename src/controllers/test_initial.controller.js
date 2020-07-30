const TestInitial = require('../models/test_initial.model');
const User = require('../models/user.model')

class TestInitialController {

	/* ================================ GETS ================================ */

	// Get test by username
	async getTestByUsername(req, res) {
		try {
            const username = req.params.username;
			const user = await User.findOne({username: username});
            var test = await TestInitial.findOne({user: user._id}).populate('results.0.id_question', 'description');
			res.send(test)
		} catch (error) {
			console.log(error);
		}
	}

	// Get all tests
	async getTests(req, res) {
		try {
			const tests = await TestInitial.find().populate('results.0.id_question', 'description');
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
			const { username, date, results } = req.body;
            const [user] = await User.find({username: username});
            const test = new TestInitial({ user: user, date: date , results: results });
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