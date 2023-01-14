const db = require('../db');

module.exports = class ProductModel {
  
  constructor(data = {}) {
    this.description = data.description;
    this.name = data.name;
    this.price = data.price || 0;
    this.type = data.type;
    this.img = data.img;
  }

  // Products list
  async find(options = {}) {
    try {

      const statement = `SELECT *
                         FROM products`;
      const values = [];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  // Retrieve product by id
  async findOne(id) {
    try {

      const statement = `SELECT *
                         FROM products
                         WHERE id = $1`;
      const values = [id];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      console.error(err);
      throw err;
    }
  }
   
  // Retrieve product by type
  async findByType(type) {
    try {

      const statement = `SELECT *
                         FROM products
                         WHERE type = $1`;
      const values = [type];
  
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows
      }
  
      return null;

    } catch(err) {
      console.error(err);
      throw err;
    }
  }
}