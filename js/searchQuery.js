var express = require("express");
var searchController = require("./searchController");

var app = express();
app.listen(8080);

// app.set('views', __dirname + '/views/');
// app.set('view engine', 'hbs');

const templating = require('consolidate');
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

let searchObject = new searchController.SearchController();

app.get('/placeholder', searchObject.getListFlights);

app.get('/', searchObject.index);