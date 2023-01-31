const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {

  constructor(created, user_id) {
    this.created = created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
    this.user_id = user_id || null;
  }

  //Creates a new cart for a user
  async create(user_id) {
    try {
      const statement = `INSERT INTO carts(user_id, modified, created)
      VALUES($1, $2, $3) RETURNING *`;

      // Generate SQL statement
      //const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
      const values = [user_id, this.modified, this.created];
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

  // Load user cart by user id
  static async findOneByUser(user_id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM carts
                         WHERE user_id = $1`;
      const values = [user_id];
  
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

  // Find cart by cart id 
  static async findOneById(id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM carts
                         WHERE id = $1`;
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