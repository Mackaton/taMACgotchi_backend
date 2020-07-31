// Dialogs
const bienvenida = require('../watson/bienvenida');
const despedida = require('../watson/despedida');

class WatsonController {
	async postWebhook(req, res) {
		try {
			bienvenida(req, res);
			despedida(req, res);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = WatsonController;
