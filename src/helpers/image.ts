const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3 = new aws.S3();
const message = require('@utils/message.utils');
const config = require('../config/config');

class Image {
  delete = (req, res, next) => {
    if (config.multer.storageType === 's3') {
      const deleteItems = [];

      deleteItems.push({ Key: req.query.file });

      const params = {
        Bucket: config.multer.bucket.name,
        Delete: {
          Objects: deleteItems,
          Quiet: false,
        },
      };

      s3.deleteObjects(params, (err, data) => {
        if (err) {
          res.status(500).json({ message: message.errorOnListImages, data: err });
        }
      });
    } else {
      const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', req.query.file);

      fs.unlinkSync(filePath);
    }

    res.locals.key = req.query.file;
    return next();
  };
}

module.exports = new Image();
