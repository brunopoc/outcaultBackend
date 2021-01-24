import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  url: {
    type: String,
    required: true,
    trim: true,
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
  },
});

schema.set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Image', schema);
