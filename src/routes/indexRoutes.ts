import express from 'express';

const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/image', imageRoutes);

module.exports = routes;
