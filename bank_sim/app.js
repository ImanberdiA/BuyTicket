var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

// View Engine
app.set('view engine', 'ejs');

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
    console.log(req.body);
});



// Set Port
app.set('port', (process.env.PORT || 3004));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});