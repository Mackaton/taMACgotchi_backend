/* Main Controller Class */
const Questions = require('../models/question.model')


class MainController {

    // GET example
    async example(req, res) {
        try {
            res.status(200).json('Todo Ok en IBM')
        } catch (error) {
            console.log(error);
        }
    }

    async getQuetions(req,res) {
        try {
            const preguntas = await Questions.find({});
            res.send(preguntas)
        } catch (error) {
            console.log(error)
        }
    }

    // POST example
    async examplePost(req, res) {
        try {
            const {valor} = req.body
            res.status(200).json(`POST OK: ${valor}`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MainController