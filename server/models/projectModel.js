const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://jsclassadmin:Ve3HDuMFndXA7inH@js-classroom-db.oy8lwan.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'projects',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const assignment = new Schema ({
  
})