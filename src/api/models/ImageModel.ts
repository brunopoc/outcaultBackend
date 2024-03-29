import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImageSchema = {
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  user: {
    type: String,
    trim: true,
    default: 'notinformed',
  },
  ref: {
    type: String,
    trim: true,
    default: 'undefined',
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const schema = new Schema(ImageSchema);

export interface IImageDoc extends mongoose.Document {
  ImageSchema
}

schema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model<IImageDoc>('Image', schema);
