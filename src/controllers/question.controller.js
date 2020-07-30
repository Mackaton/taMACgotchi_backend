const Questions = require('../models/question.model');

class QuestionsController {

	/* ================================ GETS ================================ */

	// Get all questions
	async getQuestions(req, res) {
		console.log('algo')
		try {
			const questions = await Questions.find();
			res.send(questions);
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ POSTS ================================ */

	async postQuestion(req, res) {
		try {
			const { description, options } = req.body;
			const question = new Questions({ description: description, options: options });
			await question.save(function (err) {
                if (err) return res.status(400).json({ error: 'Ha ocurrido un error' });
                res.status(200).json({ message: `Question ${description} creada correctamente` });
			});
			
		} catch (error) {
			console.log(error);
		}
	}

	/* ================================ DELETE ================================ */

	async deleteQuestion(req, res) {
		try{
			const id_question = req.params.id
			await Questions.findByIdAndDelete(id_question);
			res.status(200).json({ message: 'Question eliminado correctamente'})
		} catch (error){
			console.log(error)
		}
	}
}

module.exports = QuestionsController;