import path from 'path';
import nodemailer from 'nodemailer';

const hbs = require('nodemailer-express-handlebars');
const config = require('../config/config');

const setup = {
  host: config.email.uri,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
};
const mailer = nodemailer.createTransport(setup);
const templateDir = path.resolve(__dirname, 'src', 'templates');

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve(templateDir),
    layoutsDir: path.resolve(templateDir),
    defaultLayout: 'layout',
  },
  viewPath: path.resolve(templateDir),
  extName: '.hbs',
};

mailer.use('compile', hbs(handlebarOptions));

module.exports = mailer;
