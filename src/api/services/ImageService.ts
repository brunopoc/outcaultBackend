import mongoose from 'mongoose';

const Upload = mongoose.model('Upload');

exports.post = (file) => {
  const name = file.filename || file.name;
  const { location: url = `http://localhost:4000/files/${name}` } = file;

  const uploadFile = new Upload({ url });
  uploadFile
    .save()
    .then((data) => ({
      status: 'success', uploaded: true, url, data,
    }))
    .catch((e) => ({ status: 'error', data: e }));
};
