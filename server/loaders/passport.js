const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();

const { FACEBOOK, GOOGLE } = require('../config');

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  
  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  // Set method to deserialize data stored in cookie
  passport.deserializeUser((id, done) => {
    UserServiceInstance.getId(id, function(err, user) {
      done(err, user);
    });
  });

  // Configure local strategy for local login
  passport.use( new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await AuthServiceInstance.login({ email, password });
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));

  // Configure strategy to be use for Google login
  passport.use(new GoogleStrategy({
    clientID: GOOGLE.CONSUMER_KEY,
    clientSecret: GOOGLE.CONSUMER_SECRET,
    callbackURL: GOOGLE.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await AuthServiceInstance.googleLogin(profile);
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));

// Configure strategy to be use for Google login
passport.use(new FacebookStrategy({
    clientID: FACEBOOK.CONSUMER_KEY,
    clientSecret: FACEBOOK.CONSUMER_SECRET,
    callbackURL: FACEBOOK.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await AuthServiceInstance.facebookLogin(profile);
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
  ));

  return passport;

}