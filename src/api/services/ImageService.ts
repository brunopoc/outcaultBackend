import mongoose from 'mongoose';

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

  list = async () => {
    try {
      const data: any = await mongoose.model('Image').find();

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
