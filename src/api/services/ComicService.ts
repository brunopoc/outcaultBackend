import mongoose from 'mongoose';

import { IChapter } from '@models/ChapterModel';
import { IComic } from '@models/ComicModel';

const config = require('@config/config');

class ComicService {
  getComic = async (id) => {
    try {
      const Comic = mongoose.model('Comic');
      const dataComic: any = await Comic.findOne({
        _id: id,
      });

      const Chapter = mongoose.model('Chapter');
      const dataChapter: any = await Chapter.find({
        comicId: id,
      });

      if (!dataComic) return { status: 'errorOnLoadComic' };
      if (!dataChapter) return { status: 'errorOnLoadChapter' };

      return {
        status: 'success',
        data: { comic: dataComic, chapter: dataChapter },
      };
    } catch (err) {
      return { status: 'errorOnLoadComic', data: err };
    }
  };

  postComic = async (name: string, description: string, avatar: string, userId: string) => {
    const Comic = mongoose.model('Comic');

    console.log(name);

    const data: IComic = {
      name,
      description,
      avatar,
      userId,
    };

    const ComicModel = new Comic(data);

    const dataComic = await ComicModel.save()
      .then((result) => ({
        status: 'success',
        data: result,
      }))
      .catch((e: Error) => ({ status: 'errorOnSaveComic', data: e }));

    return { ...dataComic };
  };

  postChapter = async (title: string, number: number, comicId: string, userId: string) => {
    const Chapter = mongoose.model('Chapter');

    const data: IChapter = {
      title,
      number,
      userId,
      comicId,
    };

    const ChapterModel = new Chapter(data);

    const dataChapter = await ChapterModel.save()
      .then((result) => ({
        status: 'success',
        data: result,
      }))
      .catch((e: Error) => ({ status: 'errorOnSaveChapter', data: e }));

    return { chapter: dataChapter };
  };

  listAllComics = async (page) => {
    try {
      const Comic = mongoose.model('Comic');
      const resPerPage = parseInt(config.default.image.resPerPage, 10);
      const currentPage = parseInt(page, 10) || 1;
      const data: any = await Comic.find()
        .skip(resPerPage * currentPage - resPerPage)
        .limit(resPerPage)
        .sort({ createdAt: -1 });

      if (!data) return { status: 'errorOnListComics' };

      return { status: 'success', data };
    } catch (e) {
      return { status: 'errorOnListComics', data: e };
    }
  };
}

module.exports = new ComicService();
