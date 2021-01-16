import mongoose from 'mongoose';

exports.post = async (file) => {
  const Upload = mongoose.model('Upload');
  const name = file.filename || file.name;
  const { location: url = `http://localhost:4000/files/${name}` } = file;

  const uploadFile = new Upload({ url });
  const uploadResponse = await uploadFile
    .save()
    .then((data) => ({
      status: 'success', uploaded: true, url, data,
    }))
    .catch((e) => ({ status: 'error', data: e }));
  return uploadResponse;
};
