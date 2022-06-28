import express from 'express';

const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');
const comicRoutes = require('./comicRoutes');

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/image', imageRoutes);
routes.use('/comic', comicRoutes);

module.exports = routes;
