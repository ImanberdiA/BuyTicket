const router = require('express').Router();
const querystring = require('querystring');
var query;

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {

    if(req.user.username){
        var id_data = req.user.username.split(' ');
        var name = id_data[0], surname = id_data[1];
        console.log('name ', name);
        console.log('surname ', surname);
        query = querystring.stringify({
            "name": name,
            "surname": surname
        });
    }else{
        console.log('I am here');
        console.log(req.user);
        query = querystring.stringify({
            "name": req.user._doc.name,
            "surname": req.user._doc.surname,
            "email": req.user._doc.email
        });
    }

    res.redirect('http://localhost:3000/searchTicket/?' + query);




    //
    // var id_data = req.user.username.split(' ');
    // var name = id_data[0], surname = id_data[1];
    // console.log('name ', name);
    // console.log('surname ', surname);

    // //console.log(req.user);
    // var query = querystring.stringify({
    //      "name": name,
    //      "surname": surname
    // });
});

module.exports = router;