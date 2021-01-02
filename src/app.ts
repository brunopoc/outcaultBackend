/* eslint-disable class-methods-use-this */
import express, { Response, Request, Errback } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParse from 'body-parser';
import morgan from 'morgan';

require('dotenv').config();

const config = require('./config/config');

const indexRoutes = require('./routes/indexRoutes');

interface IAppController {
  express: any;
  middlewares: any;
  routes: any;
  errorManagement: any;
  dbConnect: any;
  loadModels: any;
}

class AppController implements IAppController {
  constructor() {
    this.middlewares();
    this.routes();
    this.errorManagement();
    this.dbConnect();
    this.loadModels();
  }

  express = express();

  middlewares() {
    const corsOption = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token'],
    };

    this.express.use(cors(corsOption));
    this.express.use(bodyParse.json());
    this.express.use(morgan('dev'));
    this.express.use(bodyParse.urlencoded({ extended: false }));
  }

  routes() {
    this.express.get('/api/v1', indexRoutes);
  }

  errorManagement() {
    this.express.use((err: Errback, req: Request, res: Response) => {
      if (err instanceof SyntaxError) {
        return res.status(400).send(JSON.stringify({
          error: 'Invalid JSON',
        }));
      }
      console.error(err);
      res.status(500).send();
    });
  }

  dbConnect() {
    console.log('DB Connected');
    mongoose.connect(config.connectionString, { useNewUrlParser: true });
  }

  loadModels() {
    const modelsPath = path.resolve(__dirname, 'models');
    fs.readdirSync(modelsPath).forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      require(`${modelsPath}/${file}`);
    });
  }
}

module.exports = new AppController().express;
