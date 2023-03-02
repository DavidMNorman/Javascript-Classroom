const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://jsclassadmin:Ve3HDuMFndXA7inH@js-classroom-db.oy8lwan.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'JS-Classroom-DB',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 86400, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);