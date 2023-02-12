const express = require('express');
const router = express.Router();

const OrderService = require('../services/OrderService');
const OrderServiceInstance = new OrderService();

module.exports = (app) => {

  app.use('/home/users', router);

  router.get('/:userId/orders', async (req, res, next) => {
    try {
      const { userId }  = req.params
      console.log(userId);
  
      const response = await OrderServiceInstance.list(userId);
      console.log(response);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }
  });

  router.get('/:userId/orders/:orderId', async (req, res, next) => {
    try {
      const { orderId } = req.params;
      console.log(orderId);
  
      const response = await OrderServiceInstance.findByOrderId(orderId);
      console.log(response);
      res.status(200).json(response);
    } catch(err) {
      next(err);
    }


  });

}