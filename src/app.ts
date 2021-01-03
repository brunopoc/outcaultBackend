/* eslint-disable class-methods-use-this */
import express, {
  Response, Request, NextFunction,
} from 'express';
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
    this.dbConnect();
    this.loadModels();
    this.routes();
    this.errorManagement();
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
    this.express.use('/api/v1', indexRoutes);
  }

  errorManagement() {
    // eslint-disable-next-line no-unused-vars, consistent-return
    this.express.use((err, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof SyntaxError) {
        return res.status(400).send(JSON.stringify({
          error: 'Invalid JSON',
        }));
      }
      res.status(500).json({ message: 'Um erro desconhecido ocorreu', data: err });
    });
  }

  dbConnect() {
    mongoose.connect(config.connectionString, { useNewUrlParser: true });
  }

  loadModels() {
    const modelsPath = path.resolve(__dirname, 'api', 'models');
    fs.readdirSync(modelsPath).forEach((file) => {
      const filePath = path.resolve(modelsPath, file);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      require(filePath);
    });
  }
}

module.exports = new AppController().express;
