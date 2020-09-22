const mongoose = require('mongoose');

const mongopath = process.env.MONGO_URI || 'mongodb+srv://admin:J7qqk0JrqJxHuBuN@cluster0.o08r2.mongodb.net/mooddb?retryWrites=true&w=majority';
mongoose.connect(mongopath, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "mooddb" })
    .then(() => {
        console.log("established database connection");
    })
    .catch(() => {
        console.log("error connecting to database");
    });
let db = mongoose.connection;

module.exports = db;