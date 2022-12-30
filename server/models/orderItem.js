const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class OrderItemModel {

  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.description = data.description;
    this.modified = moment.utc().toISOString();
    this.name = data.name;
    this.price = data.price || 0;
    this.product_id = data.id;
    this.qty = data.qty || 1;
    this.order_id = data.order_id || null;
  }

  // Creates new order item
  static async create(data) {
    try {

      // Generate SQL statement
      const statement = pgp.helpers.insert(data, null, 'orderitems') + 'RETURNING *';
 
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

  // Retrieve order items for a order
  static async find(orderId) {
    try {

      // Generate SQL statement
      const statement = `SELECT 
                            orderitems.qty,
                            orderitems.id AS "cartItemId", 
                            p.*
                         FROM "orderitems" oi
                         INNER JOIN products p ON p.id = oi."product_id"
                         WHERE "order_id" = $1`
      const values = [orderId];
  
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

}