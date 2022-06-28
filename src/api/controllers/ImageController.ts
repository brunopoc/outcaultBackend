import { Request, Response } from 'express';

const ImageService = require('@services/ImageService');
const message = require('@utils/message.utils');

class ImageController {
  post = async (req: Request, res: Response) => {
    try {
      const data = await ImageService.post(req.file, res.locals.user);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res.status(400).send({ message: message.image.uploadFailed, ...data });
    } catch (e) {
      return res.status(500).send({ message: message.image.uploadFailed, data: e });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const data = await ImageService.list(req.query.page);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res.status(406).json({ message: message.user.errorOnListImages, ...data });
    } catch (err) {
      return res.status(500).json({ message: message.user.errorOnListImages, data: err });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const data = await ImageService.delete(res.locals.key);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res.status(406).json({ message: message.user.deleteFailed, ...data });
    } catch (err) {
      return res.status(500).json({ message: message.user.deleteFailed, data: err });
    }
  ComicController};
}

module.exports = new ImageController();
