var express = require('express');
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');
var newTicket = require('./mngDB');
var mongoose = require('mongoose');

var fst = require('fs');

mongoose.connect('mongodb://localhost/testDB');

var app = express();

// View Engine
app.set('view engine', 'ejs');

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index');
});

app.route('/upload')
    .post(function (req, res, next) {

        var fstream, ttt;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            // console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                // console.log("Upload Finished of " + filename);
                ttt = fs.createReadStream(__dirname + '/img/' + filename);
                ttt.on('data', (chunk) => {
                    // console.log('chunk ', chunk);
                    var output_datas_string = chunk.toString('utf8');
                    var races_array = output_datas_string.split(';');
                    // var s = JSON.parse(races_array[1]);
                    // console.log(s.cost);

                    races_array.forEach(function (each_object_array) {
                        var each_jason = JSON.parse(each_object_array);
                        var newTicketObj = new newTicket({
                            starting_point: each_jason.starting_point,
                            end_point: each_jason.end_point,
                            flight_date: each_jason.flight_date,
                            departure_time: each_jason.departure_time,
                            boarding_time: each_jason.boarding_time,
                            baggage: each_jason.baggage,
                            class_of_service: each_jason.class_of_service,
                            airline: each_jason.airline,
                            travel_time: each_jason.travel_time,
                            cost: each_jason.cost
                        });

                        newTicket.createTicketOfRaces(newTicketObj, function (err, new_ticket) {
                            if(err) throw err;
                            if(new_ticket) {
                                console.log(new_ticket);
                            }
                        });
                    });
                });
            });
        });
    });

app.get('/delete', function (req, res) {
    fst.unlink('img/File_Name.txt', (err) => {
        if (err) throw err;
        console.log('file.txt was deleted');
    });
});

var server = app.listen(100, function() {
    console.log('Listening on port %d', server.address().port);
});