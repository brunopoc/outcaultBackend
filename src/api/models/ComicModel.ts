import mongoose from 'mongoose';

const { Schema } = mongoose;

const ComicSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  store: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    trim: true,
  },
};

const schema = new Schema(ComicSchema);

export interface IComicDoc extends mongoose.Document {
    ComicSchema
}

schema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model<IComicDoc>('Comic', schema);
