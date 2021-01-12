import express from 'express';

const { authorize } = require('@helpers/authentication');

const UserController = require('@controllers/UserController');

const routes = express.Router();

routes.post('/singin', UserController.singin);
routes.post('/singup', UserController.singup);
routes.post('/forgetpassword', UserController.forgetpassword);
routes.post('/resetpassword', UserController.resetpassword);
routes.post('/confirmemail', UserController.confirmemail);

routes.get('/test', authorize, (req, res, next) => {
  res.status(200).json({ message: 'autorizado' });
});

module.exports = routes;
