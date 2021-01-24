import express from 'express';
import multer from 'multer';

const { authorize, authorizeAdmin } = require('@helpers/authentication');
const Image = require('@helpers/image');
const ImageController = require('@controllers/ImageController');
const multerConfig = require('../helpers/multer');

const routes = express.Router();

routes.post('/upload', authorize, multer(multerConfig).single('upload'), ImageController.post);
routes.get('/list', authorizeAdmin, ImageController.list);
routes.delete('/delete', authorize, Image.delete, ImageController.delete);

module.exports = routes;
