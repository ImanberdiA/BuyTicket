const router = require('express').Router();
const querystring = require('querystring');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    var id_data = req.user.username.split(' ');
    var name = id_data[0];
    console.log(name);
    //console.log(req.user);
    var query = querystring.stringify({
        // "name": req.user.name,
        // "email": req.user.email
    });
    res.redirect('http://localhost:99/searchTicket/?' + query);
});

module.exports = router;