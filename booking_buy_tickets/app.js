var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/booking', function (req, res) {
    console.log(req.query);
    res.end();
});



// Set Port
app.set('port', (process.env.PORT || 3002));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});