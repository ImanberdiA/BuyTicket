var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

app.use(expressValidator());

var Race = require('./mngDB');

mongoose.connect('mongodb://localhost/testDB');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('searchRaces');
});

app.post('/race', function(req, res) {
    var starting_point = req.body.starting_point;
    var end_point = req.body.end_point;
    var flight_date = req.body.flight_date;
    var baggage = req.body.baggage;
    var class_of_service = req.body.class_of_service;
    console.log('flight_date', flight_date);

    // Validation
    req.checkBody('starting_point', 'Введите город отправления').notEmpty();
    req.checkBody('end_point', 'Введите город прибытия').notEmpty();
    req.checkBody('flight_date', 'Введите дату отправления').notEmpty();
    req.checkBody('baggage', 'Выберите багаж').notEmpty();
    req.checkBody('class_of_service', 'Выберите класс обслуживания').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render('searchRaces',{
            errors:errors
        });
    }else{
        var newRace = new Race({
            starting_point: starting_point,
            end_point: end_point,
            flight_date: flight_date,
            baggage: baggage,
            class_of_service: class_of_service
        });

        Race.getRacesByDate(newRace, function (err, race) {
            if(err) throw err;
            if(race){
                console.log(race);
            }
        });
    }


    // Race.createRace(newRace, function (err, race) {
    //     if(err) throw err;
    //     console.log(race);
    // });

    res.sendStatus(200);
});



// Set Port
app.set('port', (process.env.PORT || 1000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});