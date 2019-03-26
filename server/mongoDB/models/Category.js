import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  belongToMinor: { type: String, required: true, unique: false },
  postList: { type: Array, required: true, unique: false },
});
const Category = mongoose.model('Category', categorySchema, 'categories');

export default Category;
