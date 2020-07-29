const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user.controller')
const userController = new UserController

//-----------------------------------------------------------------------//
//                              Routes User
//-----------------------------------------------------------------------//

// GET all users
router.get('/users', userController.getUsers);

// GET specific user
router.get('/users/:username', userController.getUser);

// POST create user
router.post('/create/users', userController.createUser);

// PUT update user
router.put('/update/users/:username', userController.updateUser);

// DETELE user
// router.delete('/delete/users/:id', userController.funcion);



module.exports = router;