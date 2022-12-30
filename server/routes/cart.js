const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService');

const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

  app.use('/carts', router);

  router.get('/myCart', async (req, res, next) => {
    try {
      const { user_id } = req.params;
      
      const response = await CartServiceInstance.loadCart(user_id);

      res.status(200).send(response);

    } catch(err) {
      next(err);
    }
  });
 
  router.post('/myCart', async (req, res, next) => {
    try {
      const { user_id } = req.params;
    
      const response = await CartServiceInstance.create({ user_id });

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/myCart/items', async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = req.body;
    
      const response = await CartServiceInstance.addItem(id, data);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.put('/myCart/items/:cartItemId', async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const data = req.body;
    
      const response = await CartServiceInstance.updateItem(cartItemId, data);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.delete('/myCart/items/:cartItemId', async (req, res, next) => {
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