const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const UserServiceInstance = new UserService();

module.exports = (app) => {

  app.use('/home/users', router);

  router.get('/:userId', async (req, res, next) => {

    try {
      const { userId } = req.params;
    
      const response = await UserServiceInstance.get({id: userId});
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });


  router.get('/:userName/:userId', async (req, res, next) => {

    try {
      const { userName } = req.params;
    
      const response = await UserServiceInstance.get({userName});
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