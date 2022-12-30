const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartItemModel {

  // Creates a new cart item line
  static async create(data) {
    try {

      // Generate SQL statement
      const statement = pgp.helpers.insert(data, null, 'cartitems') + 'RETURNING *';
 
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
                            cartitems.id AS "cartItemId", 
                            p.*
                         FROM "cartitems" ci
                         INNER JOIN products p ON p.id = ci."productId"
                         WHERE "cart_id" = $1`
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
                         FROM "cartitems"
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