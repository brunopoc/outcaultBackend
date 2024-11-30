import mongoose from "mongoose";
import md5 from "md5";
import crypto from "crypto";

const { createToken } = require("@utils/token.utils");
// const mailer = require('@helpers/mailer');

type UserData = {
  email: string;
  name: string;
  password: string;
  nickname: string;
};

class UserService {
  singup = async ({ email, name, password, nickname }: UserData) => {
    const UserModel = mongoose.model("User");
    const emailToken = crypto.randomBytes(20).toString("hex");

    const user = new UserModel({
      name,
      email,
      nickname,
      password: md5(password + global.SALT_KEY),
      emailConfirmToken: emailToken,
    });

    const userResponse = await user
      .save()
      .then(async ({ _id: id, type }: any) => {
        const userToken = await createToken({
          email,
          nickname,
          id,
          type,
        });

        // mailer.sendMail(
        //   {
        //     to: email,
        //     from: 'suporte@sougamercomorgulho.com.br',
        //     subject: 'Confirme seu Email - Bem Vindo ao Sou Gamer Com Orgulho!',
        //     template: 'confirmemail',
        //     context: { token: emailToken, name },
        //   },
        //   (e) => ({ status: 'notcreated', data: e }),
        // );

        return {
          token: userToken,
          status: "created",
          data: {
            email,
            name,
            nickname,
            id,
            type,
          },
        };
      })
      .catch((e: any) => ({ status: "notcreated", data: e }));
    return userResponse;
  };

  singin = async ({ email, password }: UserData) => {
    const userResponse = await mongoose
      .model("User")
      .findOne({
        email,
        password: md5(password + global.SALT_KEY),
        blocked: false,
      })
      .then(async ({ _id: id, name, type }: any) => {
        if (!id) {
          return {
            status: "notfound",
            data: Error("username or password invalid"),
          };
        }
        const token = await createToken({
          email,
          name,
          id,
          type,
        });
        return {
          token,
          status: 'found',
          data: {
            email,
            name,
          },
        };
      })
      .catch((e: any) => ({ status: "notfound", data: e }));
    return userResponse;
  };

  alreadyInBase = async ({ email }: UserData) => {
    const userResponse = await mongoose
      .model("User")
      .findOne({
        email,
      })
      .then(async ({ _id: id }: any) => {
        if (!id) {
          return { status: "notIn", data: Error("email not found") };
        }
        return {
          status: "in",
        };
      })
      .catch((e: any) => ({ status: "notfound", data: e }));
    return userResponse;
  };

  forgetpassword = async ({ email }) => {
    const User = mongoose.model("User");
    User.findOne({
      email,
    })
      .then(async ({ _id: id }) => {
        if (!id) {
          return { status: "notfound" };
        }
        const token = crypto.randomBytes(20).toString("hex");

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(
          id,
          {
            $set: {
              passwordResetToken: token,
              passwordResetExpires: now,
            },
          },
          { new: true }
        );

        // mailer.sendMail(
        //   {
        //     to: email,
        //     from: 'suporte@sougamercomorgulho.com.br',
        //     template: 'forgotpassword',
        //     subject: 'Resete sua senha - Sou Gamer Com Orgulho!',
        //     context: { token },
        //   },
        //   (err) => ({ status: 'emailNotSend', data: err }),
        // );

        return { status: "success" };
      })
      .catch((e) => ({ status: "errorOcurred", data: e }));
  };

  resetpassword = async ({ email, token, password }) => {
    try {
      const user: any = await mongoose
        .model("User")
        .findOne({
          email,
        })
        .select("+passwordResetToken passwordResetExpires");

      if (!user) return { status: "userNotFound" };

      if (token !== user.passwordResetToken) {
        return { status: "invalidToken" };
      }

      const now = new Date();

      if (now > user.passwordResetExpires) {
        return { status: "expiredToken" };
      }

      user.password = md5(password + global.SALT_KEY);

      user.save();

      return { status: "success" };
    } catch (err) {
      return { status: "cantResetPassword", data: err };
    }
  };

  confirmemail = async ({ token }) => {
    try {
      const user: any = await mongoose
        .model("User")
        .findOne({
          emailConfirmToken: token,
        })
        .select("+emailConfirmToken");

      if (!user) return { status: "invalidToken" };

      user.emailChecked = true;

      user.save();

      return { status: "success" };
    } catch (err) {
      return { status: "cantResetPassword", data: err };
    }
  };

  askPermission = async (type, { id }) => {
    try {
      const user: any = await mongoose
        .model("User")
        .findByIdAndUpdate(id, { $set: { askPermission: type } });

      if (!user) return { status: "errorOnAsk" };

      return { status: "success" };
    } catch (err) {
      return { status: "errorOnAskPermission", data: err };
    }
  };

  updateProfile = async ({ name, email, nickname, avatar }, { id }) => {
    try {
      const data: any = await mongoose.model("User").findByIdAndUpdate(id, {
        $set: {
          name,
          email,
          nickname,
          avatar,
        },
      });

      if (!data) return { status: "errorOnUpdateProfile" };

      return { status: "success" };
    } catch (err) {
      return { status: "errorOnUpdateProfile", data: err };
    }
  };

  getProfile = async ({ id }) => {
    try {
      const user: any = await mongoose
        .model("User")
        .findOne({
          _id: id,
        })
        .select("name nickname email type avatar blocked");

      if (!user) return { status: "errorOnGetProfile" };

      const { name, nickname, email, type, avatar, blocked } = user;

      return {
        status: "success",
        data: { name, nickname, email, type, avatar, blocked },
      };
    } catch (err) {
      return { status: "errorOnGetProfile", data: err };
    }
  };
}

module.exports = new UserService();
