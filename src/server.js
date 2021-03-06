const { config } = require('./config/config.js');
const express = require('express');
var cors = require('cors');
const { setIntervalAsync } = require('set-interval-async/dynamic');

const PlantController = require('./controllers/plant.controller');
const UserController = require('./controllers/user.controller');

const userController = new UserController
const plantController = new PlantController

// Check every X time plants states
setIntervalAsync(plantController.checkCarbonPlants, 36000000);
setIntervalAsync(userController.updateCarbon, 35500000)

// Initilization
const app = express();

// Settings
app.set('port', config.port);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/task.routes'));
app.use(require('./routes/challenge.routes'));
app.use(require('./routes/plant_type.routes'));
app.use(require('./routes/plant.routes'));
app.use(require('./routes/medal.routes'));
app.use(require('./routes/test_initial.routes'));
app.use(require('./routes/question.routes'));

// Watson
app.use(require('./routes/watson.routes'));

module.exports = app;
