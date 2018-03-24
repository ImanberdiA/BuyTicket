var express = require("express");
var searchController = require("./searchController");

var app = express();
app.listen(8080);

app.set('views', __dirname + '/frontend/');
app.set('view engine', 'ejs');

let searchObject = new searchController.SearchController();

app.get('/:placeholder', searchObject.getAllFlights);

// app.get('/:hello', Obj.getListOfFlightsController);