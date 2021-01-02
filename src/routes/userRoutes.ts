import express from 'express';

const UserController = require('@controllers/UserController');

const routes = express.Router();

routes.post('/singin', UserController.singin);
routes.post('/singup', UserController.singup);

module.exports = routes;
