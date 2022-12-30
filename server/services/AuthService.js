const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class AuthService {

  async register(data) {

    const { username } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findByUsername(username);

      // If user already exists, reject
      if (user) {
        throw createError(409, 'Username already in use');
      }

      // Otherwise, create new user record
      return await UserModelInstance.create(data);

    } catch(err) {
      throw createError(500, err);
    }

  };

  async login(data) {

    const { username, password } = data;

    try {
      // Check if user exists
      const user = await UserModelInstance.findByUsername(username);
      
      // If no user found, reject
      if (!user) {
        throw createError(401, 'Incorrect username or password');
      }

      // Check for matching passwords
      if (user.password !== password) {
        throw createError(401, 'Incorrect username or password');
      }

      return user;

    } catch(err) {
      throw createError(500, err);
    }

  };

}