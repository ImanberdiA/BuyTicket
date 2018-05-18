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
    var query = querystring.stringify({
        "_id": req.user._doc._id.toString()
    });

    res.redirect('http://localhost:3000/tickets/?' + query);
});

module.exports = router;