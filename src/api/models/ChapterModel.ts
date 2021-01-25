import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChapterSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    unique: true,
    required: true,
  },
  comicId: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pages: [{
    url: {
      type: String,
      trim: true,
      required: true,
    },
    text: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      unique: true,
      required: true,
    },
  }],
};

const schema = new Schema(ChapterSchema);

export interface IChapterDoc extends mongoose.Document {
    ChapterSchema
}

schema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model<IChapterDoc>('Chapter', schema);
