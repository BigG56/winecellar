const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');
const CartService = require('../services/CartService');
const CartServiceInstance = new CartService();
const UserServiceInstance = new UserService();

module.exports = (app) => {

  app.use('/home/users', router);

  router.get('/:userId', async (req, res, next) => {

    try {
      const { userId } = req.params;
    
      const response = await UserServiceInstance.getId(userId);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  router.get('/:userId/is_loggedin', async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log(userId);
    
      const cart = await CartServiceInstance.loadCart(userId);
      const user = await UserServiceInstance.getId(userId);
      console.log(cart);
    
      res.status(200).json({
        cart,
        user
      });
    } catch(err) {
      next(err);
    }
  });


  /*router.get('/:userName/:userId', async (req, res, next) => {

    try {
      const { userId } = req.params;
    
      const response = await UserServiceInstance.getId({id: userId});
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });*/

  router.put('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const data = req.body;

      const response = await UserServiceInstance.update({ username: username, ...data });
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

}