import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChapterSchema = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
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
};

const schema = new Schema(ChapterSchema);

export interface IChapter {
  title: string,
  number: number,
  userId: string,
  comicId: string,
}

export interface IChapterDoc extends mongoose.Document {
    ChapterSchema
}

schema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model<IChapterDoc>('Chapter', schema);
