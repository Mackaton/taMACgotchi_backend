/* Main Controller Class */

class MainController {

    // GET example
    async example(req, res) {
        try {
            res.status(200).json('Todo Ok')
        } catch (error) {
            console.log(error);
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
