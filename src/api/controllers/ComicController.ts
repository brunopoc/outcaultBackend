import { Request, Response } from 'express';

const ComicService = require('@services/ComicService');
const message = require('@utils/message.utils');

class ComicController {
  getComic = async (req: Request, res: Response) => {
    try {
      const data = await ComicService.getComic(req.params.comicId);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .send({ message: message.errorOnLoadComic, ...data });
    } catch (e) {
      return res
        .status(500)
        .send({ message: message.errorOnLoadComic, data: e });
    }
  };

  postComic = async (req: Request, res: Response) => {
    try {
      const {
        name, description, avatar,
      } = req.body;

      const data = await ComicService.postComic(
        name,
        description,
        avatar,
        res.locals.user.id,
      );

      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.errorOnSaveComic, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.errorOnSaveComic, data: err });
    }
  };

  listAllComics = async (req: Request, res: Response) => {
    try {
      const data = await ComicService.listAllComics(req.query.page);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.errorOnListComics, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.errorOnListComics, data: err });
    }
  };

  getChapter = async (req: Request, res: Response) => {
    try {
      const data = await ComicService.getChapter(req.params.chapterId);
      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .send({ message: message.errorOnLoadComic, ...data });
    } catch (e) {
      return res
        .status(500)
        .send({ message: message.errorOnLoadComic, data: e });
    }
  };

  postChapter = async (req: Request, res: Response) => {
    try {
      const {
        title, chapterNumber, comicId,
      } = req.body;

      const data = await ComicService.postChapter(
        title,
        chapterNumber,
        comicId,
        res.locals.user.id,
      );

      if (data.status === 'success') {
        return res.status(200).json(data);
      }
      return res
        .status(406)
        .json({ message: message.errorOnSaveComic, ...data });
    } catch (err) {
      return res
        .status(500)
        .json({ message: message.errorOnSaveComic, data: err });
    }
  };
}

module.exports = new ComicController();
