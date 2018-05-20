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
var nodeMailer = require('nodemailer');
var PDFDocument = require('pdfkit');

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
    console.log(req.query);

    request('http://localhost:3000/ticket/?id='+req.query._idRace, function (error, response, body) {
        var currentTicketObj = JSON.parse(body);
        request('http://localhost:3001/users/user/?id='+req.query._idUser, function (err, respon, bdy) {
            var currentUserObj = JSON.parse(bdy);
            var userDataObj = Object.assign(currentTicketObj, currentUserObj, {id_user: req.query._idUser});
            console.log(userDataObj);
            res.render('booking_buy', {
                booking_data: userDataObj
            });
        });
    });
});

app.get('/tickets', function (req, res) {

    var ticket = new BookingTicket({
        _id: req.query.id
    });
    BookingTicket.getTicketById(ticket, function (err, tickets) {
        if(err) throw err;
        if(tickets) {
            var arrTickets = tickets.map(function (ticket) {
                var updateTicket = {
                    airline: ticket.airline,
                    starting_point: ticket.starting_point,
                    end_point: ticket.end_point,
                    flight_date: ticket.flight_date,
                    departure_time: ticket.departure_time,
                    boarding_time: ticket.boarding_time,
                    baggage: ticket.baggage,
                    class_of_service: ticket.class_of_service,
                    travel_time: ticket.travel_time,
                    cost: ticket.cost
                };
                return updateTicket;
            });

            res.send(arrTickets);
        }
    });
});

app.post('/buy', function (req, res) {
    // console.log(req.body);
    var id_user = req.body.id_user, id_race = req.body.id_race, starting_point = req.body.starting_point, end_point = req.body.end_point,
        flight_date = req.body.flight_date, departure_time = req.body.departure_time, boarding_time = req.body.boarding_time,
        baggage = req.body.baggage, class_of_service = req.body.class_of_service, airline = req.body.airline, travel_time = req.body.travel_time,
        cost = req.body.cost, clientName = req.body.clientName, clientSurname = req.body.clientSurname, gender = req.body.gender,
        birth_date = req.body.birth_date, citizenship = req.body.citizenship, document_number = req.body.document_number, validity = req.body.validity,
        phone_number = req.body.phone_number, email = req.body.email;

    // Validation
    req.checkBody('id_user', 'Инфомация о пассажире недоступна').notEmpty();
    req.checkBody('id_race', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('starting_point', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('end_point', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('flight_date', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('departure_time', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('boarding_time', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('baggage', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('class_of_service', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('airline', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('travel_time', 'Инфомация о рейсе недоступна').notEmpty();
    req.checkBody('cost', 'Инфомация о рейсе недоступна').notEmpty();
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
            errors: errors,
        });
    }else{
        var newBookingTicket = new BookingTicket({
            id_race: id_race,
            id_user: id_user,
            starting_point: starting_point,
            end_point: end_point,
            flight_date: flight_date,
            departure_time: departure_time,
            boarding_time: boarding_time,
            baggage: baggage,
            class_of_service: class_of_service,
            airline: airline,
            travel_time: travel_time,
            cost: cost,
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

            if(booking_ticket) {
                res.redirect('http://localhost:3004/bank/?idBt=' + booking_ticket._id);
            }
        });
    }
});

app.get('/pll', function (req, res) {


    var ticket = new BookingTicket({
        _id: req.query.idBt
    });
    BookingTicket.getTicketById(ticket, function (err, ticket) {
        if(err) throw err;
        if(ticket) {
            // console.log(ticket[0]);


            // let filename = 'elec_ticket.pug';
            // const doc = new PDFDocument();
            // filename = encodeURIComponent(filename) + '.pdf';
            // // Setting response to 'attachment' (download).
            // // If you use 'inline' here it will automatically open the PDF
            // res.setHeader('Content-disposition', 'automatically; filename="' + filename + '"');
            // res.setHeader('Content-type', 'application/pdf', 'application/javascript');
            // const content = 'Transaction: ' + req.query.idt + '\nFrom: ' + ticket[0].starting_point + '   To: ' + ticket[0].end_point +
            // '\nFlight Date: ' + ticket[0].flight_date + '   Departure time: ' + ticket[0].departure_time + '   Boarding time: ' + ticket[0].boarding_time +
            //     '\nBaggage: ' + ticket[0].baggage + '   Class of service: ' + ticket[0].class_of_service + '   Airline: ' + ticket[0].airline +
            //     '\nTravel time: ' + ticket[0].travel_time + '   Cost: ' + ticket[0].cost + '   Client Name: ' + ticket[0].clientName +
            //     'Client Surname: ' + ticket[0].clientSurname + '\nGender: ' + ticket[0].gender + '   Citizenship: ' + ticket[0].citizenship;
            // doc.y = 500;
            //
            // doc.image('views/images/plane.jpg', {
            //     fit: [200, 200],
            //     align: 'left',
            //     valign: 'bottom'
            // });
            //
            // doc.text()
            //     .fillColor("black")
            //     .text(content, 100, 100);
            //
            // console.log(doc);


            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'ab.imanberdi@gmail.com',
                    pass: 'colibri_1994'
                }
            });

            let mailOptions = {
                from: '"Покупка билетов" <ab.imanberdi@gmail.com>', // sender address
                to: 'programming-java@mail.ru', // list of receivers
                subject: 'Ваш электронный билет', // Subject linef
                text: 'Text', // plain text bodyf
                html: '<h2>Благодарим за покупку билета!</h2>', // html body,
                // An array of attachments
                attachments: [
                        {
                            filename: 'ticket.html',
                            content: '<!DOCTYPE HTML>\n' +
                            '<html>\n' +
                            '<head>\n' +
                                '<link rel="stylesheet" href="/css/bootstrap.css" />\n' +
                                '<link rel="stylesheet" href="/css/style.css" />'+ '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
                            '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\n' +
                            '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\n' +
                            '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
                                '<meta charset="utf-8">\n' +
                            '<title>Таблица размеров обуви</title>\n' +
                            '</head>\n' +
                            '<body>' + '' +
                            '<h2>Ваш электронный билет №' + req.query.idt + '</h2>' +
                            '<table class="table table-bordered">' + '<thead>' +
                                '<tr>\n' +
                                    '<th>Откуда</th>\n' +
                                    '<th>Куда</th>\n' +
                                    '<th>Дата рейса</th>\n' +
                                    '<th>Время вылета</th>\n' +
                                    '<th>Время прибытия</th>\n' +
                                '</tr>' + '</thead>' + '<tbody>' +
                                '<tr>' +
                                    '<td>' + ticket[0].starting_point + '</td>' +
                                    '<td>' + ticket[0].end_point + '</td>' +
                                    '<td>' + ticket[0].flight_date + '</td>' +
                                    '<td>' + ticket[0].departure_time + '</td>' +
                                    '<td>' + ticket[0].boarding_time + '</td>' +
                                '</tr>' + '</tbody>' +
                                '<tr>\n' +
                                    '<th>Багаж</th>\n' +
                                    '<th>Класс обслуживания</th>\n' +
                                    '<th>Авиакомпания</th>\n' +
                                    '<th>Время в пути</th>\n' +
                                    '<th>Стоимость билета</th>\n' +
                                '</tr>' +
                                '<tr>' +
                                    '<td>' + ticket[0].baggage + '</td>' +
                                    '<td>' + ticket[0].class_of_service + '</td>' +
                                    '<td>' + ticket[0].airline + '</td>' +
                                    '<td>' + ticket[0].travel_time + '</td>' +
                                    '<td>' + ticket[0].cost + '</td>' +
                                '</tr>' +
                                '<tr>\n' +
                                    '<th>Имя клиента</th>\n' +
                                    '<th>Фамилия клиента</th>\n' +
                                    '<th>Пол</th>\n' +
                                    '<th>Гражданство</th>\n' +
                                '</tr>' +
                                '<tr>' +
                                    '<td>' + ticket[0].clientName + '</td>' +
                                    '<td>' + ticket[0].clientSurname + '</td>' +
                                    '<td>' + ticket[0].gender + '</td>' +
                                    '<td>' + ticket[0].citizenship + '</td>' +
                                '</tr>' +
                            '</table>' +
                            '</body>\n' +
                            '</html>',
                            contentType: 'html/plain'
                        }
                    ]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);

                res.render('success');
            });



            // doc.pipe(res);
            // doc.end();


            // res.send(ticket);
        }
    });


    //
    //
    //  if(req.query.idt){
    //     //ЗДЕСЬ ФОРМИРУЕМ ЭЛ БИЛЕТ ВОЗВРАЩАЕМ НА СТРАНИЦУ И ОТПРАВЛЯЕМ НА ПОЧТУ
    //
    //     let transporter = nodeMailer.createTransport({
    //         host: 'smtp.gmail.com',
    //         port: 465,
    //         secure: true,
    //         auth: {
    //             user: 'ab.imanberdi@gmail.com',
    //             pass: 'colibri_1994'
    //         }
    //     });
    //
    //     let mailOptions = {
    //         from: '"Imanberdi A" <ab.imanberdi@gmail.com>', // sender address
    //         to: 'programming-java@mail.ru', // list of receivers
    //         subject: 'Test', // Subject line
    //         text: 'Text', // plain text body
    //         html: '<b>NodeJS</b>' // html body
    //     };
    //
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log('Message %s sent: %s', info.messageId, info.response);
    //             res.render('elec_ticket');
    //     });
    // }else{
    //      res.render('elec_ticket', {
    //
    //      });
    //  }
    // console.log(req.query);
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