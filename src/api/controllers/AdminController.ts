import { Request, Response } from 'express';

const AdminService = require('@services/AdminService');
const message = require('@utils/message.utils');

class AdminController {
  listAllUsers = async (req: Request, res: Response) => {
    try {
      const data = await AdminService.listAllUsers();
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
      const data = await AdminService.listAskPermission();
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
}

module.exports = new AdminController();
