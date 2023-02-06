const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const CartService = require('../services/CartService');
const CartServiceInstance = new CartService();
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();
const AuthService = require('../services/AuthService');
const { hashPassword } = require('../../src/utils/bcrypt');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

  app.use('/home/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
  
    try {
      const { email, username, firstname, lastname, password} = req.body;
      if (!email) {
        throw createError(400, "Email missing.")
      }
      if (!password) {
        throw createError(400, "Password missing.")
      }
      const hashedPassword = await hashPassword(password);
      await AuthServiceInstance.register(
        email,
        username,
        firstname,
        lastname,
        hashedPassword
      ); 
      const user = await UserServiceInstance.getEmail(email);
      console.log(user);
      const user_id = user.id; 
      console.log(user_id);
      const cart = await CartServiceInstance.createCart(user_id);
      console.log(cart)
      res.status(201).json({
        id: user.id,
        email: user.email,
        cart: cart.id
      });
    } catch(err) {
      next(err);
    }
  
  });
  
  // Login Endpoint
  router.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await AuthServiceInstance.login({ email, password});
      req.session.user = response
      console.log(req.session.user);
        
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  router.get('/logout', function(req, res, next){
    req.session.destroy(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  /*router.get('/logged_in', async (req, res, next) => {
    try {
      const { id } = req.params;
    
      const cart = await CartServiceInstance.loadCart(id);
      const user = await UserServiceInstance.getId({ id });
    
      res.status(200).json({
        cart,
        isSignedIn: true,
        user
      });
    } catch(err) {
      next(err);
    }
  });*/

  // Google Login Endpoint
  router.get('/google', passport.authenticate('google', { scope: ["profile"] } ));

  // Google Login Callback Endpoint
  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/');
    }
  );

  router.get('/facebook', passport.authenticate('facebook', { scope: ["profile"] } ));

  // Facebook Login Callback Endpoint
  router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login'}),
    async (req, res) => {
      res.redirect('/');
    }
  );
}