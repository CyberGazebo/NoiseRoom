const pool = require('../app');

const createBookingBlockTable = async () => {
  const query = {
    text: `CREATE TABLE IF NOT EXISTS booking_blocks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        date DATE NOT NULL,
        time TIME NOT NULL,
        block_time TIMESTAMP NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL
    );
    
    CREATE INDEX ON booking_blocks (date, time);`,
  };
  await pool.query(query);
};

createBookingBlockTable();

module.exports = pool;
