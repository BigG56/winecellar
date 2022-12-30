const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const UserServiceInstance = new UserService();

module.exports = (app) => {

  app.use('/users', router);

  router.get('/:username', async (req, res, next) => {

    try {
      const { username } = req.params;
    
      const response = await UserServiceInstance.get({ username: username });
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.put('/:username', async (req, res, next) => {
    try {
      const { username } = req.params;
      const data = req.body;

      const response = await UserServiceInstance.update({ username: username, ...data });
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

}