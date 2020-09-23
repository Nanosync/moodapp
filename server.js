const serverless = require('serverless-http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const dev = app.get('env') !== 'production';
const test = app.get('env') === 'test';

if (!test) {
    require('./db');
}

app.use(express.json());
app.enable('trust proxy');
app.use(function(req, res, next) {
    req.clientIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    next();
});
app.use(cors())

if (dev) {
    app.use(morgan('dev'));
} else {
    app.disable('x-powered-by');
    app.use(morgan('common'));
}

app.use(express.static(path.join(__dirname, 'client/dist')));

const routes = require("./routes/v1/routes");
app.use('/api/v1', routes);

if (!process.env.SERVE_FRONTEND) {
    app.get('/', (req, res) => {
        res.send("Hello world, from the server!");
    });
}

app.get('*', (req, res) => {
    if (process.env.SERVE_FRONTEND) {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    } else {
        res.redirect('/');
    }
});

// Error handler
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
    }
    res.status(500).send('Internal Server Error');
});

module.exports = app;
module.exports.handler = serverless(app);