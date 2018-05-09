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
    console.log(req.query);
    res.render('booking_buy', {
        booking_data: req.query
    });
});



// Set Port
app.set('port', (process.env.PORT || 3002));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});