const { config } = require('./config/config.js');
const express = require('express');
var cors = require('cors');

// Initilization
const app = express();

// Settings
app.set('port', config.port);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use(require('./routes/example.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/task.routes'));

module.exports = app;
