const { config } = require('./config/config.js');
const express = require('express');
var cors = require('cors');

const { setIntervalAsync } = require('set-interval-async/dynamic');
const PlantController = require('./controllers/plant.controller');
const plantController = new PlantController

// Check if Trimester has ended
setIntervalAsync(plantController.checkCarbonPlants, 36000000);

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
app.use(require('./routes/plant_type.routes'));
app.use(require('./routes/plant.routes'));
app.use(require('./routes/medal.routes'));
app.use(require('./routes/test_initial.routes'));
app.use(require('./routes/question.routes'));

module.exports = app;
