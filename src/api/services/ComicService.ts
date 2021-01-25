import mongoose from 'mongoose';

const config = require('../../config/config');

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

  postComic = async (name, description, avatar, chapter, user) => {
    const Comic = mongoose.model('Comic');
    const Chapter = mongoose.model('Chapter');

    if (!chapter && chapter.length <= 0) {
      return { status: 'error', data: 'Capitulo vazio' };
    }

    const ComicModel = new Comic({
      name,
      description,
      avatar,
      userId: user.id,
    });

    const dataComic = await ComicModel.save()
      .then((result) => ({
        status: 'success',
        data: result,
      }))
      .catch((e) => ({ status: 'errorOnSaveComic', data: e }));

    const ChapterModel = new Chapter({
      name: chapter.name,
      pages: chapter.pages,
      order: chapter.order,
      userId: user.id,
      comicId: dataComic.data.id,
    });

    const dataChapter = await ChapterModel.save()
      .then((result) => ({
        status: 'success',
        data: result,
      }))
      .catch((e) => ({ status: 'errorOnSaveChapter', data: e }));

    return { comic: dataComic, chapter: dataChapter };
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
    } catch (err) {
      return { status: 'errorOnListComics', data: err };
    }
  };
}

module.exports = new ComicService();
