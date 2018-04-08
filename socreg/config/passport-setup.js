const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: '358682495804-9f1a9erd7bpp3d705pl55qlf2rnp4cke.apps.googleusercontent.com',
        clientSecret: '748dvIuoZMdmmfnQPwo-NslL'
    }, () => {
        // passport callback function
    })
);
