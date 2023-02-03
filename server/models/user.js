const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {
  constructor(email, password, firstname, lastname, username) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
  }

  // Creates a new user
  async create(email, username, firstname, lastname, hashedPassword) {
    
    try {
      // Generate SQL statement
      const statement = `INSERT INTO users(email, username, firstname, lastname, password)
      VALUES($1, $2, $3, $4, $5)`;
      const values = [ email, username, firstname, lastname, hashedPassword];

      // Execute SQL statment
      const result = await db.query(statement, values);
      if(result.rows?.length) {
        return result.rows[0];
      }
        return null;
    } catch(err) {
      throw new Error(err);
    }
  }

  // Updates user record
  async update(data) {
    try {

      const { username, ...params } = data;

      // Generate SQL statement
      const condition = pgp.as.format('WHERE username = ${username} RETURNING *', { username });
      const statement = pgp.helpers.update(params, null, 'users') + condition;
  
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

  //Find user by email
  async findOneByEmail(email) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE email = $1`;
      const values = [email];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Find user by username
  async findByUsername(username) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE username = $1`;
      const values = [username];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Find user by id
  async findById(userId) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE id = $1`;
      const values = [userId];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findOneByGoogleId(id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE google ->> 'id' = $1`;
      const values = [id];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async findOneByFacebookId(id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE facebook ->> 'id' = $1`;
      const values = [id];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }
}