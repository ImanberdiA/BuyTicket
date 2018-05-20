const router = require('express').Router();
const querystring = require('querystring');
var users_service_id = require("../users_service_id");
const user_id_db = require('../models/con_w_other_s');

var encryptor = require('simple-encryptor')(users_service_id.unique_key_encrypt_decrypt);

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // console.log(req.user);

    var newIdUser = new user_id_db({
        id_cur_user: req.user._id
    });

    user_id_db.createIdUser(newIdUser, function (err, IdUser) {
        if(err){
            console.log('Error in createIdUser');
        } else{
            var query = querystring.stringify({
                "_id": req.user._doc._id.toString(),
                "id_app": users_service_id.id_login_app
            });

            res.redirect('http://localhost:3000/tickets/?' + query);
        }
    });

    // var encryptedSK = encryptor.encrypt(users_service_id.secret_key);

    // console.log('encryptedSK ', encryptedSK);
});

router.get('/auth', function (req, res) {
    console.log(req.query);

    // user_id_db.getIdUser();
    user_id_db.getIdUser(req.query.uid, function (err, id_user) {
        if(err) throw err;
        console.log(id_user.length);

        if(id_user.length == 0){
            res.send('access_denied');
        } else{
            if(req.query.uid == id_user[0].id_cur_user){
                res.send('success');
            }
        }
    });
});

module.exports = router;