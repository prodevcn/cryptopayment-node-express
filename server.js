require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const conf = require('./src/config/config');
const app = express();
mongoose.connect(conf.dbUrl, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB successfully connected.');
    })
    .catch(err => {
        console.error(err);
    });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(passport.initialize());
require('./src/config/passport')(passport);
const routes = require('./src/routes');
routes(app);

var server = http.createServer(app);
server.listen(conf.port, '0.0.0.0', () => {
    console.log(`Server up and running on port : ${conf.port}`);
})
