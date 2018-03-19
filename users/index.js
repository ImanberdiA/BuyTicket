const mysql = require('mysql');
const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const config = require('./config');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router(app);

app.listen(config.users.port);