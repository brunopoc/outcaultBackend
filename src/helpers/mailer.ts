import path from 'path';
import nodemailer from 'nodemailer';
import { hbs } from 'nodemailer-express-handlebars';

const uri = process.env.SMTP;
const mailer = nodemailer.createTransport(uri);
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
