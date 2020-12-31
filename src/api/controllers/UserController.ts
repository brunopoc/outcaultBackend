import { Request, Response } from 'express';
import User from '@models/User';

export default class UserController {
  static show(req: Request, res: Response): any {
    const user: User = new User();
    user.name = 'João';
    user.email = 'joaozinho.testador@gmail.com';
    return res.json({ user });
  }
}
