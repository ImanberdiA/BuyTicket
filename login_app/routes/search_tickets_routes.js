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
    var name = id_data[0], surname = id_data[1];
    console.log('name ', name);
    console.log('surname ', surname);

    //console.log(req.user);
    var query = querystring.stringify({
         "name": name,
         "surname": surname
    });
    res.redirect('http://localhost:99/searchTicket/?' + query);
});

module.exports = router;