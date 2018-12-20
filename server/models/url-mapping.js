import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const url = new Schema({
  org: { type: 'String', required: true },        // can possibly change this to key
  to: { type: 'String', required: true },         // redirect link
  from: { type: 'String', required: true },       // custom link
  clicks: { type: 'Number', required: true },     // click count
  createTime: { type: 'Number', required: true },  // time the link was created
  expTiem: { type: 'Number', required: true },    // time the link will expire
});

export default mongoose.model('url', url);
