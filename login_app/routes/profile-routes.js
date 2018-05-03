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
    res.render('profile', { user: req.user });
});

router.get('/pow', authCheck, (req, res) => {
    var query = querystring.stringify({
        "a": 1,
        "b": 2,
        "valid":"your string here"
    });
    res.redirect('http://localhost:400/?' + query);

    // res.render('profile', { user: req.user });
});

module.exports = router;