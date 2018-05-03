var express = require('express');
var app = express();
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
    secret: 'test',
    resave: false,
    store: new MongoStore({
        url: 'mongodb://localhost/saveSessions'
    })
}));

app.get('/', function (req, res) {
    req.session.varTest = 1;
     // console.log(req.query);
    res.end();
});

app.get('/pt', function (req, res) {
    console.log(req.session.varTest);
    // console.log(req.query);
    res.end();
});




// Set Port
app.set('port', (process.env.PORT || 400));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});