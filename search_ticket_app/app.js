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
var request = require('request');
const search_service_id = require('./search_service_id');

var encryptor = require('simple-encryptor')(search_service_id.unique_key_encrypt_decrypt);

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

// SearchTicket function
app.get('/tickets', function (req, res) {
    console.log(req.query);

    if(req.query.id_app == search_service_id.id_search_app){

        request('http://localhost:3001/tickets/auth/?uid=' + req.query._id, function (error, response, body) {
            if(body == "success"){
                req.session.loginAppSession = {UserIdFromLoginApp: req.query._id};
                res.render('search_races');
            } else if(body == "access_denied"){
                res.redirect('http://localhost:3001/users/login');
            }
        });
    }

    // ЗДЕСЬ СРАВНИТЬ ID ДВУХ СЕРВИСОВ, И ПРИ УСПЕХЕ ОТПРАВИТЬ ПАРОЛЬ ЭТОГО СЕРВИСА НА СЕРВИС ПОЛЬЗ. ДЛЯ СРАВНЕНИЯ
});

// BuyTicket function
app.post('/buyticket', function (req, res) {
    // console.log("Ticket id: ", req.body);
    // console.log("Session: ", req.session.loginAppSession);

    var ticketObj = req.body;
    var allObj = Object.assign(ticketObj, req.session.loginAppSession);
    // console.log('Common object: ', allObj);

    var query = querystring.stringify({
        "_idRace": allObj.ticket_number,
        "_idUser": allObj.UserIdFromLoginApp
    });
    res.redirect("http://localhost:3002/booking/?" + query);
});

// Races function
app.post('/races', function(req, res) {
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
        res.render('list_of_found_races',{
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
                // console.log("Все рейсы соответ. условиям ", race);
                res.render('list_of_found_races', {
                    data_races: race
                });
            }
        });
    }
});

app.get('/ticket', function (req, res) {
    var race = new Race({
        _id: req.query.id
    });

    Race.getRaceById(race, function (err, race) {
       if(err) throw err;

       if(race){
           var raceUpdated = {
               "id_race": race[0]._id,
               "starting_point": race[0].starting_point,
               "end_point": race[0].end_point,
               "flight_date": race[0].flight_date,
               "departure_time": race[0].departure_time,
               "boarding_time": race[0].boarding_time,
               "baggage": race[0].baggage,
               "class_of_service": race[0].class_of_service,
               "airline": race[0].airline,
               "travel_time": race[0].travel_time,
               "cost": race[0].cost
           };
           res.send(raceUpdated);
       }
    });
});


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});