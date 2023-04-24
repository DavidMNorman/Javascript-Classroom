const { Pool } = require('pg');

const { PG_URI } = process.env;

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
