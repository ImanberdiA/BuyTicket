var express = require('express');
var app = express();
var request = require('request');


app.get('/bank', function (req, res) {
    console.log(req.query.idBt);
    // Здесь сформулировать эл.билет и отправить назад по res, и также отправить в эл.адрес
    request('http://localhost:3002/ticket_info/?_id='+req.query.idBt, function (error, response, body) {
        console.log(body);
    });
});

// Set Port
app.set('port', (process.env.PORT || 3004));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+ app.get('port'));
});