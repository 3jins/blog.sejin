import mongoose from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

const AutoIncrement = MongooseSequence(mongoose);

const postSchema = new mongoose.Schema({
  // postNo: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true }, // unique: mdFile cannot have unique keys like hash or postNo...
  dateCreated: { type: Date, required: true },
  dateUpdated: { type: Date, required: true },
  content: { type: String, required: false, text: true },
  belongToMajor: { type: String, required: true },
  belongToMinor: { type: String, required: true },
  category: { type: String, required: /* true */false },
  series: { type: String, required: false },
  tags: { type: Array, required: false }, // just a string array composed of tagNames
});

postSchema.plugin(AutoIncrement, { inc_field: 'postNo' });
const Post = mongoose.model('Post', postSchema, 'posts');

export default Post;
