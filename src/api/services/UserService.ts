import { Request, Response } from 'express';

const md5 = require('md5');
const { generateToken } = require('@utils/token.utils');
const mongoose = require('mongoose');

const User = mongoose.model('User');

type UserData = {
  email: string;
  name: string;
  password: string;
  nickname: string;
}
interface IUserService {
  singup: (data: UserData) => void;
  singin: (req: Request, res: Response) => void;
}

class UserService implements IUserService {
    singup = (data) => {
      const {
        email, name, password, nickname,
      } = data;
      const user = new User({
        name,
        email,
        nickname,
        password: md5(password + global.SALT_KEY),
      });
      user
        .save()
        .then(async ({
          _id: id, likedPosts, type,
        }) => {
          const userToken = await generateToken({
            email,
            nickname,
            id,
            type,
          });

          return {
            token: userToken,
            data: {
              email,
              name,
              nickname,
              id,
              likedPosts,
              type,
            },
          };
        })
        .catch((e: any) => {
          throw e;
        });
    }

  singin = (data) => {
    User.findOne({
      email: data.email,
      password: md5(data.password + global.SALT_KEY),
      blocked: false,
    })
      .then(async ({
        _id: id, name, email, type, likedPosts, avatar,
      }) => {
        if (!id) {
          throw new Error('username or password invalid');
        }
        const token = await generateToken({
          email,
          name,
          id,
          type,
        });
        return {
          token,
          data: {
            email,
            name,
            id,
            likedPosts,
            avatar,
            type,
          },
        };
      })
      .catch((e: any) => {
        throw e;
      });
  }
}

module.exports = new UserService();
