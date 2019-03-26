import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  tagName: { type: String, required: true, unique: true },
  belongToMinorList: { type: Array, required: true, unique: false },
  postList: { type: Array, required: true, unique: false },
});
const Tag = mongoose.model('Tag', tagSchema, 'tags');

export default Tag;
