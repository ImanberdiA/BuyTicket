var express = require("express");
var searchController = require("./searchController");

var app = express();
app.listen(8080);

let searchObject = new searchController.SearchController();

app.get('/:placeholder', searchObject.getAllFlights);

// app.get('/:hello', Obj.getListOfFlightsController);