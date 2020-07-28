require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongo_user: process.env.USER_MONGODB,
    mongo_password: process.env.PASSWORD_MONGODB,
    mongo_host: process.env.HOST_MONGODB,
    mongo_db: process.env.DATABASE_MONGODB,
};

module.exports ={config};