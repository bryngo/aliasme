import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  org: { type: 'String', deafult: '', required: true },
  redirectDomain: { type: 'String', default: '', required: true },
  customDomain: { type: 'String', default: '', required: true },
  customURL: { type: 'String', default: '', required: true },
  slug: { type: 'String', default: '', required: true },
  cuid: { type: 'String', default: '', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Post', postSchema);
