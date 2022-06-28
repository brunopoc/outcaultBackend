/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';

const { authorize } = require('@helpers/authentication');
const ComicController = require('@controllers/ComicController');

const routes = express.Router();

routes.post('/post', authorize, ComicController.postComic);
routes.get('/listAll', authorize, ComicController.listAllComics);

module.exports = routes;
