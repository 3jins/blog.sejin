import mongoose from 'mongoose';
import { loadConnectionInfo, makeConnection } from './makeConnection';

const serverEnv = process.argv[2];
const { addressList, port, database } = loadConnectionInfo(serverEnv);
makeConnection(addressList, port, database);

const post = new mongoose.Schema({
  postNo: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true }, // unique: mdFile cannot have unique keys like hash or postNo...
  dateCreated: { type: Date, required: true, unique: false },
  dateUpdated: { type: Date, required: true, unique: false },
  content: { type: String, required: false, unique: false },
  tags: { type: Array, required: false, unique: false }, // just a string array composed of tagNames
  belongToMajor: { type: String, required: true, unique: false },
  belongToMinor: { type: String, required: true, unique: false },
});

const tag = new mongoose.Schema({
  tagName: { type: String, required: true, unique: true },
  belongToMinor: { type: String, required: true, unique: false },
  postList: { type: Array, required: true, unique: false },
});

const Post = mongoose.model('Post', post, 'posts');
const Tag = mongoose.model('Tag', tag, 'tags');

export { Post, Tag };
