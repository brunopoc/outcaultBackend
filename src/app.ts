/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-dynamic-require, global-require */

import express, { Express, Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
import bodyParse from "body-parser";
import morgan from "morgan";

require("dotenv").config();

const config = require("./config/config");

const indexRoutes = require("./routes/indexRoutes");

interface IAppController {
  express: Express;
  middlewares: () => void;
  routes: () => void;
  errorManagement: () => void;
  dbConnect: () => void;
  loadModels: () => void;
}

class AppController implements IAppController {
  constructor() {
    this.middlewares();
    this.dbConnect();
    this.loadModels();
    this.routes();
    this.errorManagement();
  }

  express: Express = express();

  middlewares() {
    const corsOption = {
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      exposedHeaders: ["x-auth-token"],
    };

    this.express.use(cors(corsOption));
    this.express.use(bodyParse.json());
    this.express.use(morgan("dev"));
    this.express.use(bodyParse.urlencoded({ extended: false }));
  }

  routes() {
    this.express.use("/api/v1", indexRoutes);
  }

  errorManagement() {
    this.express.use(
      (err, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof SyntaxError) {
          res
            .status(400)
            .json({
              error: "Invalid JSON",
            })
            .end();
        }
        res
          .status(500)
          .json({ message: "Um erro desconhecido ocorreu", data: err })
          .end();
      }
    );
  }

  dbConnect() {
    mongoose.connect(config.connectionString).catch((e) => console.log(e));
  }

  loadModels() {
    const modelsPath = path.resolve(__dirname, "api", "models");
    fs.readdirSync(modelsPath).forEach((file) => {
      const filePath = path.resolve(modelsPath, file);
      require(filePath);
    });
  }
}

module.exports = new AppController().express;
