const pool = require('../app');

const createPaymentTable = async () => {
  const query = {
    text: `CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      booking_id INTEGER NOT NULL REFERENCES bookings(id),
      amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
      payment_date DATE NOT NULL CHECK (payment_date <= CURRENT_DATE),
      method_id INTEGER NOT NULL REFERENCES payment_methods(id),
      CONSTRAINT unique_payment UNIQUE (booking_id, payment_date)
    )`,
  };
  await pool.query(query);
};

createPaymentTable();

module.exports = pool;
