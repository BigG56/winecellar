const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class UserService {

  async getEmail(email) {

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneByEmail(email);

      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, 'User record not found');
      }

      return user;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };

  async getUsername(data) {

    const { username } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findByUsername(username);

      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, 'User record not found');
      }

      return user;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };

  async getId(userId) {

    try {
      // Check if user already exists
      const user = await UserModelInstance.findById(userId);

      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, 'User record not found');
      }

      return user;

    } catch(err) {
      console.error(err)
      throw err;
    }

  };

  async update(data) {

    try {
      // Check if user already exists
      const user = await UserModelInstance.update(data);

      return user;

    } catch(err) {
      console.error(err);
      throw err;
    }

  };

}