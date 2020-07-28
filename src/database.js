// DATABASE CONNECTION

const mongoose = require('mongoose')
const { config } = require('./config/config.js');

const MONGODB_URI = `mongodb+srv://${config.mongo_user}:${config.mongo_password}@${config.mongo_host}/${config.mongo_db}?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Database is connected'))
    .catch(err => console.log(err, 'Revisar credenciales'));