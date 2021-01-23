import express from 'express';

const { authorize, authorizeAdmin } = require('@helpers/authentication');

const UserController = require('@controllers/UserController');

const routes = express.Router();

routes.post('/singin', UserController.singIn);
routes.post('/singup', UserController.singUp);
routes.post('/forgetpassword', UserController.forgetPassword);
routes.post('/resetpassword', UserController.resetPassword);
routes.post('/confirmemail', UserController.confirmEmail);

routes.post('/askpermission', authorize, UserController.askPermission);
routes.get('/getProfile', authorize, UserController.getProfile);
routes.post('/updateProfile', authorize, UserController.updateProfile);

routes.get('/list/users', authorizeAdmin, UserController.listAllUsers);
routes.get('/list/askpermission', authorizeAdmin, UserController.listAskPermission);

module.exports = routes;
