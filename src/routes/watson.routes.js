const { Router } = require('express');
const router = Router();

const WatsonController = require('../controllers/watson.controller');
const watsonController = new WatsonController();

//-----------------------------------------------------------------------//
//                              Routes Watson
//-----------------------------------------------------------------------//

// POST watson webhook
router.post('/watson', watsonController.postWebhook);

module.exports = router;
