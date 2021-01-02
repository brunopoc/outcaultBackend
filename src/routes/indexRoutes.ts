import express from 'express';

const userRoutes = require('./userRoutes');

const routes = express.Router();

routes.post('/show', userRoutes);

module.exports = routes;
