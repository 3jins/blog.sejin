import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
  seriesName: { type: String, required: true, unique: true },
  belongToMinor: { type: String, required: true, unique: false },
  postList: { type: Array, required: true, unique: false },
});
const Series = mongoose.model('Series', seriesSchema, 'series');

export default Series;
