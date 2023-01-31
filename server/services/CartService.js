const createError = require('http-errors');
const CartModel = require('../models/cart');
const OrderModel = require('../models/order');
const CartItemModel = require('../models/cartItem');

module.exports = class CartService {

  async createCart(user_id) {
    try {
      if (!user_id) { throw new createError(406, "User required.")};
      // Instantiate new cart and save
      const Cart = new CartModel();
      const cart = await Cart.create(user_id);
      

      return cart;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };

  async loadCart(user_id) {
    try {
      // Load user cart based on ID
      const cart = await CartModel.findOneByUser(user_id);

      // Load cart items and add them to the cart record
      const items = await CartItemModel.find(cart.id);
      cart.items = items;

      return cart;

    } catch(err) {
      throw createError(404, 'Cart record not found');
    }
  }

  async addItem(id, product, quantity) {
    try {
      // Load user cart based on ID
      const cart = await CartModel.findOneByUser(id);

      // Create cart item
      const cartItem = await CartItemModel.create({cart_id: cart.id, product, quantity});

      return cartItem;

    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  async removeItem(cartItemId) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.delete(cartItemId);

      return cartItem;

    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  async updateItem(cartItemId, data) {
    try {
      // Remove cart item by line ID
      const cartItem = await CartItemModel.update(cartItemId, data);

      return cartItem;

    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  async checkout(cartId, user_id, paymentInfo) {
    try {

      const stripe = require('stripe')(STRIPE_SECRET_KEY);

      // Load cart items
      const cartItems = await CartItemModel.find(cartId);

      // Generate total price from cart items
      const total = cartItems.reduce((total, item) => {
        total += Number(item.price);
        return total;
      }, 0);

      // Generate initial order
      const Order = new OrderModel({ total, user_id });
      Order.addItems(cartItems);
      await Order.create();

      // Make charge to payment method
      const charge = await stripe.charges.create({
        amount: total,
        currency: 'GBP',
        source: paymentInfo.id,
        description: 'The WineCellar'
      });

      // On successful charge to payment method, update order status to COMPLETE
      const order = Order.update({ status: 'COMPLETE' });

      return order;

    } catch(err) {
      console.error(err);
      throw err;
    }
  }

}