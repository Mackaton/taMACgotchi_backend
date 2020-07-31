class WatsonController {
  /* ================================ POSTS ================================ */

  async postWebhook(req, res) {
    try {
      console.log('pene', req, res);
      res.status(200).send({ message: 'done' });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = WatsonController;
