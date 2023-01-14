const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class UserService {

  async getUsername(data) {

    const { userName } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findByUsername(userName);

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

  async getId(data) {

    const { id } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findById(id);

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