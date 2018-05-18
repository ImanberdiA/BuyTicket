const router = require('express').Router();
const querystring = require('querystring');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

// get profile
router.get('/', authCheck, (req, res) => {
    console.log(req.user.surname);
    res.render('profile', { user: req.user });
});

module.exports = router;