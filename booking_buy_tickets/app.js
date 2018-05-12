var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var path = require('path');
var bodyParser = require('body-parser');

app.use(expressValidator());
app.use(cookieParser());

// View Engine
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/booking', function (req, res) {
    //console.log(req.query);
    res.render('booking_buy', {
        booking_data: req.query
    });
});

app.post('/buy', function (req, res) {
    console.log(req.body);
    var airline = req.body.airline, cost = req.body.cost, departure_time = req.body.departure_time,
        boarding_time = req.body.boarding_time, travel_time = req.body.travel_time, clientName = req.body.clientName,
        clientSurname = req.body.clientSurname, gender = req.body.gender, birth_date = req.body.birth_date, citizenship = req.body.citizenship,
        document_number = req.body.document_number, validity = req.body.validity, phone_number = req.body.phone_number, email = req.body.email;

    // Validation
    req.checkBody('clientName', 'Введите имя').notEmpty();
    req.checkBody('clientSurname', 'Введите фамилию').notEmpty();
    req.checkBody('gender', 'Введите пол').notEmpty();
    req.checkBody('birth_date', 'Введите дату рождения').notEmpty();
    req.checkBody('citizenship', 'Введите гражданство').notEmpty();
    req.checkBody('document_number', 'Введите номер документа').notEmpty();
    req.checkBody('validity', 'Введите срок действия документа').notEmpty();
    req.checkBody('phone_number', 'Введите номер телефона').notEmpty();
    req.checkBody('email', 'Введите email').notEmpty();

    var errors = req.validationErrors();

    if

});


// Set Port
app.set('port', (process.env.PORT || 3002));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});