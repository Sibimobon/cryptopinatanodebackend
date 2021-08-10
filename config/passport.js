// import all the things we need 

const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../src/models/User')
const dotenv = require('dotenv')
dotenv.config();


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    //get the user data from google 
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
      email: profile.emails[0].value
    }

    try {
      //find the user in our database 
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
          console.log(user.displayName);
        //If user present in our database.
        done(null, user)
      } else {
        // if user is not preset in our database save user data to database.
        user = await User.create(newUser)
        console.log(user.displayName);
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});
