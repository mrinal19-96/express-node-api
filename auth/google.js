
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

// var GoogleStrategy = require('passport-google-oauth20').Strategy;
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';




passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, profile); // For simplicity, just return the profile
  }
));



passport.serializeUser(function(user, done) {
//   done(null, user.id);
  done(null, user);

});

passport.deserializeUser(function(user, done) {
//   User.findById(id, function (err, user) {
    // done(err, user);
    done(null, user);

//   });
});