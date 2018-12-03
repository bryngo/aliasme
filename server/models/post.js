import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  org: { type: 'String', required: true },
  redirectDomain: { type: 'String', required: true },
  customDomain: { type: 'String', required: true },
  customURL: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Post', postSchema);
