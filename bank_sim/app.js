var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var BuyingTicket = require('./mngDB');
const querystring = require('querystring');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/bankingDB');

// View Engine
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/bank', function (req, res) {
    // console.log(req.query.idBt);
    // request('http://localhost:3002/ticket_info/?_id='+req.query.idBt, function (error, response, body) {
    //     console.log(body);
    // });

    res.render('banking', {
        ticket_id: req.query.idBt
    });
});

app.post('/poi', function (req, res) {
    // console.log(req.body);

    var newBuyingTicket = new BuyingTicket({
        ticket_id: req.body.ticket_id,
        card_number: req.body.card_number,
        validity: req.body.validity,
        secure_code: req.body.secure_code,
        clientName: req.body.clientName,
        clientSurname: req.body.clientSurname
    });

    //SIMULYACIYU BANKA SDELAT

    BuyingTicket.createBuyingTicket(newBuyingTicket, function (err, buying_ticket) {
        if(err) throw err;

        var query = querystring.stringify({
            "success": true,
            "idt": buying_ticket._id.toString(),
            "idBt": req.body.ticket_id
        });

        res.redirect('http://localhost:3002/pll/?' + query);
    });
});



// Set Port
app.set('port', (process.env.PORT || 3004));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});