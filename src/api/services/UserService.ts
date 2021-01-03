import mongoose from 'mongoose';
import md5 from 'md5';

const { createToken } = require('@utils/token.utils');

type UserData = {
  email: string;
  name: string;
  password: string;
  nickname: string;
}

class UserService {
    singup = async ({
      email, name, password, nickname,
    }: UserData) => {
      const UserModel = mongoose.model('User');

      const user = new UserModel({
        name,
        email,
        nickname,
        password: md5(password + global.SALT_KEY),
      });

      const userResponde = await user
        .save()
        .then(async ({
          _id: id, type,
        }: any) => {
          const userToken = await createToken({
            email,
            nickname,
            id,
            type,
          });

          return {
            token: userToken,
            status: 'created',
            data: {
              email,
              name,
              nickname,
              id,
              type,
            },
          };
        })
        .catch((e: any) => ({ status: 'notcreated', data: e }));
      return userResponde;
    }

  singin = async ({ email, password }: UserData) => {
    const userResponse = await mongoose.model('User').findOne({
      email,
      password: md5(password + global.SALT_KEY),
      blocked: false,
    })
      .then(async ({
        _id: id, name, type,
      }: any) => {
        if (!id) {
          return { status: 'notfind', data: Error('username or password invalid') };
        }
        const token = await createToken({
          email,
          name,
          id,
          type,
        });
        return {
          token,
          status: 'find',
          data: {
            email,
            name,
            id,
          },
        };
      })
      .catch((e: any) => ({ status: 'notfind', data: e }));
    return userResponse;
  }
}

module.exports = new UserService();
