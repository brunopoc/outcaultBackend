import { Request, Response } from 'express';

const UserService = require('@services/UserService');

class UserController {
  singup = async (req: Request, res: Response) => {
    try {
      const data = await UserService.singup(req.body);
      if (data.status === 'created') {
        return res.status(200).json(data);
      }
      return res.status(409).json({ message: 'Não foi possível fazer o cadastro do novo usuario', ...data });
    } catch (err) {
      res.status(500).json({ message: 'Não foi possível fazer o cadastro do novo usuario', data: err });
      return err;
    }
  };

  singin = async (req: Request, res: Response) => {
    try {
      const data = await UserService.singin(req.body);
      if (data.status === 'find') {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: 'Não foi possível encontrar o usuario', ...data });
    } catch (err) {
      res.status(500).json({ message: 'Não foi possível encontrar o usuario', data: err });
      return err;
    }
  }
}

module.exports = new UserController();
