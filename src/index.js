const { config } = require('./config/config.js');

const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
    (config.dev === 'development')
    ? console.log(`Listening in DEVELOPMENT http://localhost:${config.port}`)
    : console.log(`Listening http://localhost:${config.port}`)
})