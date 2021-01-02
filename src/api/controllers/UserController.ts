import { Request, Response } from 'express';

const md5 = require('md5');
const { generateToken } = require('@utils/token.utils');
const mongoose = require('mongoose');

const UserService = require('@services/UserService');

const User = mongoose.model('User');

class UserController {
  singup = (req: Request, res: Response) => {
    try {
      const response = UserService.singup(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return err;
    }
  };

  singin = async (req: Request, res: Response) => {
    try {
      const response = UserService.singin(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return err;
    }
  }
}

module.exports = new UserController();
