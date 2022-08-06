/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import multer from 'multer';

const { authorize, authorizeAdmin } = require('@helpers/authentication');
const Image = require('@helpers/image');
const multerConfig = require('@helpers/multer');
const ImageController = require('@controllers/ImageController');

const routes = express.Router();

/*
    upload -> sobe uma unica pagina relacionada a um capitulo de uma obra em especifico.
    Requisitos para isso:
        - ID da obra que sera atualizada
        - Autenticação feita pelo autor ou por um admin
        - imagem no campo "upload"
        - Numero da pagina
        - Numero do capitulo
*/

routes.post('/page/upload', authorize, multer(multerConfig).single('upload'), ImageController.postPage);
routes.get('/page/list/all', authorizeAdmin, ImageController.list);
routes.delete('/page/delete', authorize, Image.delete, ImageController.delete);

module.exports = routes;
