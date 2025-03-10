require('dotenv').config();
const pg = require('pg');

module.exports = {
    development : {
        "username": "postgres",
        "password": "uuaauaua123",
        "database": "asa_personalweb",
        "host": "127.0.0.1",
        dialect: 'postgres',
        dialectModule: pg,
    },

    production : {
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
    },
}