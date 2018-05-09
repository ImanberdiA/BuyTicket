var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var Race = require('./mngDB');
const querystring = require('querystring');

app.use(expressValidator());
app.use(cookieParser());

app.use(session({
    secret: 'test',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
        url: 'mongodb://localhost/saveSessions'
    })
}));

app.get('/searchTicket', function (req, res) {
    req.session.varTest = {clientName: req.query.name, clientSurname: req.query.surname};
    console.log('SearchTicket: ', req.query);
    res.render('search_races');
});

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

app.post('/buyticket', function (req, res) {
    console.log("Ticket id: ", req.body);
    console.log("Session: ", req.session.varTest);

    var ticketObj = req.body;
    var allObj = Object.assign(ticketObj, req.session.varTest);
    console.log('Common object: ', allObj);

    var query = querystring.stringify({
        "airline": allObj.airline,
        "cost": allObj.cost,
        "departure_time": allObj.departure_time,
        "boarding_time": allObj.boarding_time,
        "travel_time": allObj.travel_time,
        "clientName": allObj.clientName,
        "clientSurname": allObj.clientSurname
    });
    res.redirect("http://google.com/?" + query);
});

app.post('/race', function(req, res) {
    var starting_point = req.body.starting_point;
    var end_point = req.body.end_point;
    var flight_date = req.body.flight_date;
    var baggage = req.body.baggage;
    var class_of_service = req.body.class_of_service;

    // Validation
    req.checkBody('starting_point', 'Введите город отправления').notEmpty();
    req.checkBody('end_point', 'Введите город прибытия').notEmpty();
    req.checkBody('flight_date', 'Введите дату отправления').notEmpty();
    req.checkBody('baggage', 'Выберите багаж').notEmpty();
    req.checkBody('class_of_service', 'Выберите класс обслуживания').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        // console.log('i am in shit');
        res.render('searchRaces',{
            errors: errors
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
                res.render('list_of_found_races', {
                    data_races: race
                });
            }
        });
        // res.end();
    }


    // Race.createRace(newRace, function (err, race) {
    //     if(err) throw err;
    //     console.log(race);
    // });
});



// Set Port
app.set('port', (process.env.PORT || 99));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});