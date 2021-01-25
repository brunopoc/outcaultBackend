global.SALT_KEY = process.env.SALT_KEY;
global.EMAIL_TMPL = '<strong>{0}</strong>';

module.exports = {
  connectionString: process.env.DB_CONNECT,
  SMTP: process.env.SMTP,
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  multer: {
    storageType: process.env.STORAGE_TYPE,
    bucket: { name: process.env.BUCKET_NAME },
  },
  pagination: {
    default: {
      resPerPage: process.env.DEFAULT_RES_PER_PAGE,
    },
    image: {
      resPerPage: process.env.IMAGE_RES_PER_PAGE,
    },
  },
};
