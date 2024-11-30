import express from 'express';

const { authorize, authorizeAdmin } = require('@helpers/authentication');

const UserController = require('@controllers/UserController');
const AdminController = require('@controllers/AdminController');

const routes = express.Router();

routes.post('/singin', UserController.singIn);
routes.post('/singup', UserController.singUp);
routes.post('/password/forget', UserController.forgetPassword);
routes.post('/password/reset', UserController.resetPassword);
routes.post('/email/confirm', UserController.confirmEmail);
routes.post('/email/alreadyin', UserController.alreadyInBase);

routes.post('/profile/ask/permission', authorize, UserController.askPermission);
routes.get('/profile/get', authorize, UserController.getProfile);
routes.post('/profile/update', authorize, UserController.updateProfile);

routes.get('/profiles/list', authorizeAdmin, AdminController.listAllUsers);
routes.get('/profiles/list/permission', authorizeAdmin, AdminController.listAskPermission);

module.exports = routes;
