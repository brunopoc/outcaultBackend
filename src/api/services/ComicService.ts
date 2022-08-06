import mongoose from 'mongoose';

import { IChapter } from '@models/ChapterModel';
import { IComic } from '@models/ComicModel';

const config = require('@config/config');

class ComicService {
  getComic = async (id) => {
    try {
      const Chapter = mongoose.model('Chapter');
      const dataChapter = await Chapter.find({
        comicId: id,
      }, {
        title: 1, chapterNumber: 1, comicId: 1,
      });

      const Comic = mongoose.model('Comic');
      const dataComic: any = await Comic.findOne({
        _id: id,
      });

      if (!dataComic) return { status: 'errorOnLoadComic' };

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

  getChapter = async (id) => {
    try {
      const Chapter = mongoose.model('Chapter');
      const dataChapter = await Chapter.findOne({
        _id: id,
      }, {
        title: 1, chapterNumber: 1, comicId: 1, createdAt: 1,
      });

      if (!dataChapter) return { status: 'errorOnLoadComic' };

      const Pages = mongoose.model('Pages');
      const dataImage: any = await Pages.find({
        // eslint-disable-next-line no-underscore-dangle
        chapterId: dataChapter._id,
      }, { url: 1, pageNumber: 1, _id: 0 });

      return {
        status: 'success',
        data: { chapter: dataChapter, pages: dataImage },
      };
    } catch (err) {
      return { status: 'errorOnLoadComic', data: err };
    }
  };

  postChapter = async (title: string, chapterNumber: number, comicId: string, userId: string) => {
    const Comic = mongoose.model('Comic');

    const dataComic: any = await Comic.findOne({
      _id: comicId,
    });

    if (!dataComic) return { status: 'errorOnLoadComic' };

    const Chapter = mongoose.model('Chapter');

    const data: IChapter = {
      title,
      chapterNumber,
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

    return { dataChapter };
  };
}

module.exports = new ComicService();
