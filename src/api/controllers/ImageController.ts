import { Request, Response } from 'express';

const ImageService = require('@services/ImageService');
const message = require('@utils/message.utils');

exports.post = async (req: Request, res: Response) => {
  try {
    const data = await ImageService.post(req.file);
    if (data.status === 'success') {
      return res.status(200).json(data);
    }
    return res.status(400).send({ message: message.image.uploadFailed, ...data });
  } catch (e) {
    return res.status(500).send({ message: message.image.uploadFailed, data: e });
  }
};
