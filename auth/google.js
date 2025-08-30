
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

// 
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-dev-client-id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your-dev-client-secret';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback';



passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    try{

      return cb(null, profile); // For simplicity, just return the profile
    }catch(err){
      return cb(err, null);
    }
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