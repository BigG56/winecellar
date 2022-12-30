const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });
const OrderItem = require('./orderItem');

module.exports = class OrderModel {

  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.items = data.items || [];
    this.modified = moment.utc().toISOString();
    this.status = data.status || 'PENDING';
    this.total = data.total || 0;
    this.user_id = data.user_id || null;
  }

  addItems(items) {
    this.items = items.map(item => new OrderItem(item));
  }

  // Creates a new order for user
  async create() {
    try {

      const { items, ...order } = this;

      // Generate SQL statement
      const statement = pgp.helpers.insert(order, null, 'orders') + ' RETURNING *';

      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {

        // Add new information generated in the database
        Object.assign(this, result.rows[0]);

        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Updates a order for user
  async update(data) {
    try {

      // Generate SQL statement
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
      const statement = pgp.helpers.update(data, null, 'orders') + condition;
  
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

  // Load user orders
  static async findByUser(userId) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM orders
                         WHERE "user_id" = $1`;
      const values = [userId];
  
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

  // Retrieve order by id
  static async findById(orderId) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM orders
                         WHERE id = $1`;
      const values = [orderId];
  
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