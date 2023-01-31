const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();
const bcrypt = require('../../src/utils/bcrypt');

module.exports = class AuthService {

  async register(email, username, firstname, lastname, hashedPassword) {

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneByEmail(email);

      // If user already exists, reject
      if (user) {
        throw createError(409, "Email already in use");
      }

      // Otherwise, create new user record
      const newUser = await UserModelInstance.create(
        email,
        username,
        firstname,
        lastname,
        hashedPassword
      );
      return newUser;

    } catch(err) {
      throw createError(500, err);
    }

  };

  async login(data) {

    const { email, password } = data;

    try {

      if (!(email && password)) {
        throw createError(400, 'All input required.')
      }
      // Check if user exists
      const user = await UserModelInstance.findOneByEmail(email);
      const compHashPassword = await bcrypt.comparePassword(password, user.password)
      if (!(user && compHashPassword)) {
        throw createError(401, 'Incorrect email or password.');
      }
      return user;
    } catch(err) {
      throw createError(500, err);
    }

  };


  async googleLogin(profile) {

    const { id, displayName } = profile;

    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByGoogleId(id);

      // If no user found, create new user
      if (!user) {
        return await UserModelInstance.create({ google: { id, displayName } });
      }

      // User already exists, return profile
      return user;

    } catch(err) {
      throw createError(500, err);
    }

  };

  async facebookLogin(profile) {

    const { id, displayName } = profile;

    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByFacebookId(id);

      // If no user found, create new user
      if (!user) {
        return await UserModelInstance.create({ facebook: { id, displayName } });
      }

      // User already exists, return profile
      return user;

    } catch(err) {
      throw createError(500, err);
    }

  };


}