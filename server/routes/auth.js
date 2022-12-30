const express = require('express');
const router = express.Router();
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

  app.use('/api/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
  
    try {
      const data = req.body;
      
      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  
  });
  
  // Login Endpoint
  router.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try {
      const { username, password } = req.body;
    
      const response = await AuthServiceInstance.login({ username, password});
    
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });
}