const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger');
const swagger = require('./swagger');

module.exports = async (app) => {

  // Load Express middlewares
  const expressApp = await expressLoader(app);

  // Load Passport middleware
  const passport = await passportLoader(expressApp);

  // Load API route handlers
  await routeLoader(app, passport);

  // Load Swagger
  await swaggerLoader(app, swagger);
  
  // Error Handler
  app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.json({
      message: err.message,
      error: err
    });
    res.status(status);
  });
}