// Dialogs
const bienvenida = require('../watson/wellcome');
const despedida = require('../watson/goodbye');
const estadoDesafios = require('../watson/challenge_status');
const estadoPlanta = require('../watson/plant_status');

class WatsonController {
	async postWebhook(req, res) {
		console.log(req.body);

		try {
			bienvenida(req, res);
			despedida(req, res);
			estadoDesafios(req, res);
			estadoPlanta(req, res);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = WatsonController;
