var express = require('express');    //Express Web Server
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var newTicket = require('./mngDB');
var mongoose = require('mongoose');

var fst = require('fs');

mongoose.connect('mongodb://localhost/t');

var app = express();

// View Engine
app.set('view engine', 'ejs');

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

/* ==========================================================
Create a Route (/upload) to handle the Form submission
(handle POST requests to /upload)
Express v4  Route definition
============================================================ */

app.get('/', function (req, res) {
    res.render('index');
});

app.route('/upload')
    .post(function (req, res, next) {

        var fstream, ttt;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                ttt = fs.createReadStream(__dirname + '/img/' + filename);
                ttt.on('data', (chunk) => {
                    // console.log(JSON.parse(chunk));
                    var current_ticket = JSON.parse(chunk);
                    var newTicketObj = new newTicket({
                        starting_point: current_ticket.starting_point,
                        end_point: current_ticket.end_point,
                        flight_date: current_ticket.flight_date,
                        departure_time: current_ticket.departure_time,
                        boarding_time: current_ticket.boarding_time,
                        baggage: current_ticket.baggage,
                        class_of_service: current_ticket.class_of_service,
                        airline: current_ticket.airline,
                        travel_time: current_ticket.travel_time,
                        cost: current_ticket.cost
                    });

                    newTicket.createTicketOfRaces(newTicketObj, function (err, new_ticket) {
                        if(err) throw err;
                        if(new_ticket) {
                            console.log(new_ticket);
                        }
                    });


                    // console.log(typeof JSON.parse(chunk.toString('utf8')));
                });





                // ttt.pipe(res);
                // res.redirect('back');           //where to go next
            });
        });
    });

app.get('/delete', function (req, res) {
    fst.unlink('img/File_Name.txt', (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
    });
});

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});