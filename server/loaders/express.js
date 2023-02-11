const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser');
const MemoryStore = require('memorystore')(session);

module.exports = (app) => {

  app.use(cookieParser());
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({
    origin: "http://localhost:6000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: false }));

  app.set('trust proxy', 1);
  const store = new MemoryStore({
    checkPeriod: 86400000
  });

  
  // Creates a session
  app.use(
    session({  
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none'
      }
    })
  );

  return app;
  
}
