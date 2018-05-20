const router = require('express').Router();
// const querystring = require('querystring');
var request = require('request');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

// get profile
router.get('/', authCheck, (req, res) => {
    // console.log(req.user);
    
    request('http://localhost:3002/tickets/?id=' + req.user._id, function (error, response, body) {
        var tickets = JSON.parse(body);
        console.log(tickets);
        res.render('profile', { user: req.user, tickets: tickets });
    });
});



module.exports = router;