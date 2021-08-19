const mongoose = require('mongoose');

const dotenv = require('dotenv');

const URL = process.env.DATABASE_URL;

async function connect() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect success');
    } catch (error) {
        console.log('Connect fail');
    }
}

module.exports = { connect };
