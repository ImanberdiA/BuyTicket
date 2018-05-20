var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users_service_id = require("../users_service_id");
const user_id_db = require('../models/con_w_other_s');

var User = require('../models/user');


const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

// Register
router.get('/register', function(req, res){
    res.render('register');
});

// Login
router.get('/login', function(req, res){
    res.render('login');
});

// Register User
router.post('/register', function(req, res){
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Введите имя').notEmpty();
    req.checkBody('surname', 'Введите фамилию').notEmpty();
    req.checkBody('email', 'Введите Email').notEmpty();
    req.checkBody('email', 'Email не совпадают').isEmail();
    req.checkBody('password', 'Введите пароль').notEmpty();
    req.checkBody('password2', 'Пароль не совпадает').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {
        var newUser = new User({
            name: name,
            surname: surname,
            email:email,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'Вы успешно зарегистрировались и можете войти!');

        res.redirect('/users/login');
    }
});


router.post('/updateUser', function (req, res) {
    var UserObj = {_id: req.body._id, name: req.body.name, surname: req.body.surname};
    User.updateUser(UserObj, function (err, up_user) {
        if(err) throw err;
        if(up_user)
        {
            console.log('up_user', up_user);
            res.redirect('http://localhost:3001/profile');
        }
    });
});


passport.use(new LocalStrategy(
    function(email, password, done) {
        User.getUserByUsername(email, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Неизвестный пользователь!'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Неверный пароль!'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    // console.log(req.user);

    var newIdUser = new user_id_db({
        id_cur_user: req.user._id
    });

    user_id_db.deleteIdUser(req.user._id, (err, IdUser) => {
        // console.log('Delete ');
    });

    req.logout();

    req.flash('success_msg', 'Вы успешно вышли с системы');

    res.redirect('/users/login');
});

router.get('/user', function (req, res) {
    console.log('I AM WITHOUT KEY');
    var user = new User({
        _id: req.query.id
    });

    User.getUserById(req.query.id, function (err, user) {
        if(err) throw err;
        if(user){
            console.log(user);
            var userUpdated = {
                "name": user.name,
                "surname": user.surname,
                "email": user.email
            };
            res.send(userUpdated);
        }
    });
});

router.get('/user_id', authCheck, function (req, res) {
    res.send(users_service_id.password_login_app);
});


module.exports = router;