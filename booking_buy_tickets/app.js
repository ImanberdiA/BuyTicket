var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var BookingTicket = require('./mngDB');
var mongoose = require('mongoose');
var querystring = require('querystring');

app.use(expressValidator());
app.use(cookieParser());

mongoose.connect('mongodb://localhost/booking_tickets');

// View Engine
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/booking', function (req, res) {
    // console.log(req.query);

    request('http://localhost:3000/tickets/?id='+req.query._idRace, function (error, response, body) {
        var currentTicketObj = JSON.parse(body);
        request('http://localhost:3001/users/userId/?id='+req.query._idUser, function (err, respon, bdy) {
            var currentUserObj = JSON.parse(bdy);
            var userDataObj = Object.assign(currentTicketObj, currentUserObj);
            res.render('booking_buy', {
                booking_data: userDataObj
            });
        });
    });
});

app.post('/buy', function (req, res) {
    // console.log(req.body);
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

    if(errors){
        res.render('booking_buy', {
            errors: errors
        });
    }else{
        console.log("I AM HEREEEE");
        var newBookingTicket = new BookingTicket({
            clientName: clientName,
            clientSurname: clientSurname,
            gender: gender,
            birth_date: birth_date,
            citizenship: citizenship,
            document_number: document_number,
            validity: validity,
            phone_number: phone_number,
            email: email
        });

        BookingTicket.createBookingTicket(newBookingTicket, function (err, booking_ticket) {
            if(err) throw err;
            // console.log('New Booking Ticket ', booking_ticket._id);

            // request('http://localhost:3004/bank/?idBt='+booking_ticket._id, function (error, response, body) {
            //     if(error){
            //         res.render('booking_buy',{
            //             success: 'OSHIBKA PRI POKUPKE'
            //         });
            //     }else{
            //         // Здесь сформулировать эл.билет и отправить назад по res, и также отправить в эл.адрес
            //         console.log('BODY ', body);
            //         res.render('booking_buy',{
            //             success: 'POKUPKA PROSHLA I VASH EL. BILET'
            //         });
            //     }
            // });
            // var bt = booking_ticket._id;
            // var query = querystring.stringify({
            //     "idBt": booking_ticket._id
            // });

            res.redirect('http://localhost:3004/bank/?idBt=' + booking_ticket._id);
        });
    }
});

app.get('/pll', function (req, res) {
    console.log(req.query);
});

// // Return data of current ticket to bank_sim by ticket_id
// app.get('/ticket_info', function (req, res) {
//     var ticket = new BookingTicket({
//         _id: req.query._id
//     });
//     BookingTicket.getTicketById(ticket, function (err, ticket) {
//         if(err) throw err;
//         if(ticket) {
//             console.log(ticket);
//             res.send(ticket);
//         }
//     });
// });


// Set Port
app.set('port', (process.env.PORT || 3002));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});