const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');
const passport = require('passport')

const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

  app.use('/home/users/:userId/carts', router);

  router.get('/:cartId', async (req, res, next) => {
    try {
      const user  = req.body;
      console.log(user)
      
      const response = await CartServiceInstance.loadCart({id});

      res.status(200).json(response);

    } catch(err) {
      next(err);
    }
  });
 
  /*router.post('/myCart', passport.authenticate('local'), async (req, res, next) => {
    try {
      const { id } = req.user.id;
    
      const response = await CartServiceInstance.createCart({user_id: id});

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });*/

  router.post('/:cartId', async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
    
      const response = await CartServiceInstance.addItem();

      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  router.put('/myCart/items', async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const data = req.body;
    
      const response = await CartServiceInstance.updateItem(cartItemId, data);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.delete('/myCart/items/:productId', async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
    
      const response = await CartServiceInstance.removeItem(cartItemId);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/myCart/checkout', async (req, res, next) => {
    try {
      const { id } = req.user;

      const { cartId, paymentInfo } = req.body; 

      const response = await CartServiceInstance.checkout(cartId, id, paymentInfo);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });
}