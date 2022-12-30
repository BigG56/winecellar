const createError = require('http-errors');
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {

  async list(options) {

    try {
      // Load products
      const products = await ProductModelInstance.find(options);

      return products;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };

  async getById(id) {

    try {
      // Check if product exists
      const product = await ProductModelInstance.findOne(id);

      // If no product found, reject
      if (!product) {
        throw createError(404, 'Product not found');
      }

      return product;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };

  async getByType(type) {

    try {
      // Check if product exists
      const product = await ProductModelInstance.findByType(type);

      // If no product found, reject
      if (!product) {
        throw createError(404, 'Product not found');
      }

      return product;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };

}