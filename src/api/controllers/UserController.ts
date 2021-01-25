import { Request, Response } from 'express';

const UserService = require('@services/UserService');
const message = require('@utils/message.utils');

class UserController {
  singUp = async (req: Request, res: Response) => {
    try {
      const data = await UserService.singup(req.body);
      if (data.status === 'created') {
        return res.status(200).json(data);
      }
      return res
        .status(400)
        .json({ message: message.user.notCreated, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.notCreated, data: err });
    }
  };

  singIn = async (req: Request, res: Response) => {
    try {
      const data = await UserService.singin(req.body);
      if (data.status === 'find') {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: message.user.notLogged, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.notLogged, data: err });
    }
  };

  forgetPassword = async (req: Request, res: Response) => {
    try {
      const data = await UserService.forgetpassword(req.body);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(400)
        .json({ message: message.user.forgetFailed, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.forgetFailed, data: err });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const data = await UserService.resetpassword(req.body);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.user.resetFailed, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.resetFailed, data: err });
    }
  };

  confirmEmail = async (req: Request, res: Response) => {
    try {
      const data = await UserService.confirmemail(req.body);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.user.confirmFailed, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.confirmFailed, data: err });
    }
  };

  askPermission = async (req: Request, res: Response) => {
    try {
      const data = await UserService.askPermission(
        req.body.type,
        res.locals.user,
      );
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res.status(406).json({ message: message.user.askFailed, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.askFailed, data: err });
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const data = await UserService.updateProfile(req.body, res.locals.user);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.user.errorOnUpdateProfile, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.errorOnUpdateProfile, data: err });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const data = await UserService.getProfile(res.locals.user);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.user.errorOnListUsers, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.errorOnListUsers, data: err });
    }
  };

  listAskPermission = async (req: Request, res: Response) => {
    try {
      const data = await UserService.listAskPermission();
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.user.errorOnListAsk, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.errorOnListAsk, data: err });
    }
  };

  listAllUsers = async (req: Request, res: Response) => {
    try {
      const data = await UserService.listAllUsers();
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.user.errorOnListUsers, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.user.errorOnListUsers, data: err });
    }
  };
}

module.exports = new UserController();
