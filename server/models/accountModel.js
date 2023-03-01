const { Pool } = require('pg');

const PG_URI = 'postgres://hfltheyf:9RlDGtBNILZpnK7RqhbECTbifleYZ7YD@mahmud.db.elephantsql.com/hfltheyf';

// create new pool
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executing query', text);
    return pool.query(text, params, callback);
  },
};
