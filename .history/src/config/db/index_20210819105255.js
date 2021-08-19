const mongoose = require('mongoose');

const URL =
    'mongodb+srv://congdat:<password>@cluster0.lspg7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
