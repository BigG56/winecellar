const createError = require('http-errors');
const OrderModel = require('../models/order');
const OrderItemModel = require('../models/orderItem');

module.exports = class OrderService {

  /*async create(data) {
    const { userId } = data;

    try {

      // Instantiate new order and save
      const Order = new OrderModel();
      const order = await Order.create({ userId, total });

      return order;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };*/

  async list(userId) {
    try {
      // Load user orders based on user ID
      const orders = await OrderModel.findByUser(userId);

      return orders;

    } catch(err) {
      throw createError(404, 'Order record not found');
    }
  }

  /*async findById(orderId) {
    try {
      // Load user orders based on order ID
      const order = await OrderModel.findById(orderId);

      return order;

    } catch(err) {
      throw createError(404, 'Order record not found');
    }
  }*/

  async findByOrderId(orderId) {
    try {
      // Load user orderitems based on order ID
      const orderItems = await OrderItemModel.find(orderId);
      console.log(orderItems);

      return orderItems;

    } catch(err) {
      throw createError(404, 'Order item record not found');
    }
  }

}