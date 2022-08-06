import mongoose from 'mongoose';

const config = require('../../config/config');

class ImageService {
  post = async (file, user) => {
    const Image = mongoose.model('Image');
    const name = file.filename || file.name;
    const { location: url = `http://localhost:4000/files/${name}` } = file;

    const uploadFile = new Image({ url, user: user.email, key: file.key });
    const uploadResponse = await uploadFile
      .save()
      .then((data) => ({
        status: 'success', uploaded: true, url, data,
      }))
      .catch((e) => ({ status: 'error', data: e }));
    return uploadResponse;
  };

  postPage = async (file, user, { pageNumber, chapterId }) => {
    const Pages = mongoose.model('Pages');
    const name = file.filename || file.name;
    const { location: url = `http://localhost:4000/files/${name}` } = file;

    const uploadFile = new Pages({
      url, user: user.email, key: file.key, chapterId, pageNumber,
    });
    const uploadResponse = await uploadFile
      .save()
      .then((data) => ({
        status: 'success', uploaded: true, url, data,
      }))
      .catch((e) => ({ status: 'error', data: e }));
    return uploadResponse;
  };

  list = async (page) => {
    try {
      const Image = mongoose.model('Image');
      const resPerPage = parseInt(config.pagination.image.resPerPage, 10);
      const currentPage = parseInt(page, 10) || 1;
      const data: any = await Image.find()
        .skip(resPerPage * currentPage - resPerPage)
        .limit(resPerPage)
        .sort({ createdAt: -1 });

      if (!data) return { status: 'errorOnListImages' };

      return { status: 'success', data };
    } catch (err) {
      return { status: 'errorOnListImages', data: err };
    }
  };

  delete = async (fileKey) => {
    try {
      const data: any = await mongoose.model('Image').deleteOne({
        key: fileKey,
      });

      if (!data) return { status: 'deleteFailed' };

      return { status: 'success', data };
    } catch (err) {
      return { status: 'deleteFailed', data: err };
    }
  };
}

module.exports = new ImageService();
