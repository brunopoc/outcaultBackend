import express from 'express';

const userRoutes = require('./userRoutes');

const routes = express.Router();

routes.use('/user', userRoutes);

module.exports = routes;