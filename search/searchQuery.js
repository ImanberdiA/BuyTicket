var express = require("express");
var searchController = require("./searchController");

var app = express();
app.listen(8080);

app.set('views', __dirname + '/js/');
app.set('view engine', 'ejs');

let searchObject = new searchController.SearchController();

app.get('/:placeholder', searchObject.getListFlights);

// app.get('/:pp', searchObject);

// app.get('/:hello', Obj.getListOfFlightsController);