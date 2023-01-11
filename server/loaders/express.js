const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');
const dotenv = require('dotenv').config()

module.exports = (app) => {

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('trust proxy', 1);
  const store = new session.MemoryStore();

  
  // Creates a session
  app.use(
    session({  
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'Secure'
      }
    })
  );

  return app;
  
}
