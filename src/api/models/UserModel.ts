import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: String,
    select: false,
  },
  emailConfirmToken: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    trim: true,
    default: 'user',
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  emailChecked: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    trim: true,
  },
  askPermission: {
    type: String,
    trim: true,
    default: 'default',
  },
};

const schema = new Schema(UserSchema);

export interface IUserDoc extends mongoose.Document {
  UserSchema
}

schema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model<IUserDoc>('User', schema);
