import express from 'express';
import UserController from '@controllers/UserController';

const routes = express.Router();

routes.get('/show', UserController.show);

module.exports = routes;
