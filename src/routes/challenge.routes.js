const { Router } = require('express');
const router = Router();

const ChallengeController = require('../controllers/challenge.controller');
const challengeController = new ChallengeController();

//-----------------------------------------------------------------------//
//                              Routes Medals
//-----------------------------------------------------------------------//

// GET
router.get('/challenges', challengeController.getChallenges);
router.get('/challenges/:username', challengeController.getChallengeByUsername);

// UPDATE
router.put('/update/challenges/:id', challengeController.updateChallenge);

// POST
router.post('/create/challenges', challengeController.postChallenge);

// DELETE
router.delete('/delete/challenges/:id', challengeController.deleteChallenge);

//router.post('/insert/challenges', challengeController.insertChallenges)

module.exports = router;