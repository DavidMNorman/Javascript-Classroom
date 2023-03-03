const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 86400, default: Date.now },
});
const Session = mongoose.model('Session', sessionSchema);

const assignmentSchema = new Schema({
  name: { type: String, required: true, unique: false },
  description: String,
  dueDate: String,
  body: String,
});
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = {
  Session,
  Assignment,
};
