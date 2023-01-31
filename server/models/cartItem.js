const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartItemModel {

  constructor(qty, cart_id, product_id) {
    this.qty = qty;
    this.cart_id = cart_id;
    this.product_id = product_id;
  }

  // Creates a new cart item line
  static async create(cart_id, product, quantity) {
    try {

      // Generate SQL statement
      //const statement = pgp.helpers.insert(data, null, 'cartitems') + 'RETURNING *';
      const statement = 'INSERT INTO cartitems (cart_id, product_id, qty) VALUES ($1, $2, $3)';
      const values = [cart_id, product, quantity]
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Updates cart items
  static async update(id, data) {
    try {

      // Generate SQL statement
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(data, null, 'cartitems') + condition;
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Get cart items for cart
  static async find(cartId) {
    try {

      // Generate SQL statement
      const statement = `SELECT 
                            cartitems.qty,
                            cartitems.id AS cartItemId, 
                            products.*
                         FROM cartitems
                         INNER JOIN products ON products.id = cartitems.product_id
                         WHERE cart_id = $1`
      const values = [cartId];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw new Error(err);
    }
  }

  // Deletes cart item line
  static async delete(id) {
    try {

      // Generate SQL statement
      const statement = `DELETE
                         FROM cartitems
                         WHERE id = $1
                         RETURNING *`;
      const values = [id];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}