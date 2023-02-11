const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const ProductServiceInstance = new ProductService();

module.exports = (app) => {

  app.use('/home/products', router);

  router.get('/', async (req, res, next) => {
    try {

      const queryParams = req.query;

      const response = await ProductServiceInstance.list(queryParams);
      console.log(response);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.get('/:productType', async (req, res, next) => {
    try {
      const { productType } = req.params;

      const response = await ProductServiceInstance.getByType(productType);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.get('/:productId/:productType', async (req, res, next) => {
    try {
      const { productId } = req.params;

      const response = await ProductServiceInstance.getById(productId);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });
}