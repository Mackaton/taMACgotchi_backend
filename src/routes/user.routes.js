const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user.controller')
const userController = new UserController

//-----------------------------------------------------------------------//
//                              Routes User
//-----------------------------------------------------------------------//

// GET Example
// router.get('/ruta', userController.funcion);

module.exports = router;