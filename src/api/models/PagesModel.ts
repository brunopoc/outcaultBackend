import mongoose from 'mongoose';

const { Schema } = mongoose;

const PageSchema = {
  url: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String,
    trim: true,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  chapterId: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
};

const schema = new Schema(PageSchema);

export interface IPageDoc extends mongoose.Document {
  PageSchema
}

schema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model<IPageDoc>('Pages', schema);
