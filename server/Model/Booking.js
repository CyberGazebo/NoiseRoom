const pool = require('../app');

const createBookingTable = async () => {
  const query = {
    text: `CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      date DATE NOT NULL CHECK (date >= CURRENT_DATE),
      time TIME NOT NULL,
      duration INTEGER NOT NULL CHECK (duration > 0),
      recording BOOLEAN NOT NULL,
      status VARCHAR(10) NOT NULL CHECK (status IN ('Запланирован', 'Пройден', 'Отменен')),
      cancellation_count INTEGER NOT NULL DEFAULT 0,
      CONSTRAINT unique_booking UNIQUE (user_id, date, time)
    )`,
  };
  await pool.query(query);
};

createBookingTable();