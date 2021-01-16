import express from 'express';
import multer from 'multer';

const { authorize } = require('@helpers/authentication');
const ImageController = require('@controllers/ImageController');
const multerConfig = require('../helpers/multer');

const routes = express.Router();

routes.post('/upload', authorize, multer(multerConfig).single('upload'), ImageController.post);

module.exports = routes;
