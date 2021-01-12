import { Request, Response } from 'express';

const UserService = require('@services/UserService');
const message = require('@utils/message.utils');

class UserController {
  singup = async (req: Request, res: Response) => {
    try {
      const data = await UserService.singup(req.body);
      if (data.status === 'created') {
        return res.status(200).json(data);
      }
      return res.status(400).json({ message: message.user.notCreated, ...data });
    } catch (err) {
      return res.status(500).json({ message: message.user.notCreated, data: err });
    }
  };

  singin = async (req: Request, res: Response) => {
    try {
      const data = await UserService.singin(req.body);
      if (data.status === 'find') {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: message.user.notLogged, ...data });
    } catch (err) {
      return res.status(500).json({ message: message.user.notLogged, data: err });
    }
  };

  forgetpassword = async (req: Request, res: Response) => {
    try {
      const data = await UserService.forgetpassword(req.body);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res.status(400).json({ message: message.user.forgetFailed, ...data });
    } catch (err) {
      return res.status(500).json({ message: message.user.forgetFailed, data: err });
    }
  };

  resetpassword = async (req: Request, res: Response) => {
    try {
      const data = await UserService.resetpassword(req.body);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res.status(406).json({ message: message.user.resetFailed, ...data });
    } catch (err) {
      return res.status(500).json({ message: message.user.resetFailed, data: err });
    }
  };

  confirmemail = async (req: Request, res: Response) => {
    try {
      const data = await UserService.confirmemail(req.body);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res.status(406).json({ message: message.user.confirmFailed, ...data });
    } catch (err) {
      return res.status(500).json({ message: message.user.confirmFailed, data: err });
    }
  };
}

module.exports = new UserController();
