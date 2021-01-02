import { Request, Response, NextFunction } from 'express';
import { createToken } from '@utils/token.utils';

exports.generateToken = (req: Request, res: Response, next: NextFunction) => {
  req.body.token = createToken(req.body.auth);
  return next();
};

exports.sendToken = (req: Request, res: Response) => {
  res.setHeader('x-auth-token', req.body.token);
  return res.status(200).send(JSON.stringify(req.body.user));
};
