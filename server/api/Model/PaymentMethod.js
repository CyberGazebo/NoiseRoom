const pool = require('../app');

const createPaymentMethodTable = async () => {
  const query = {
    text: `CREATE TABLE IF NOT EXISTS payment_methods (
      id SERIAL PRIMARY KEY,
      method VARCHAR(10) NOT NULL UNIQUE CHECK (method IN ('cash', 'online'))
    )`,
  };
  await pool.query(query);
};

createPaymentMethodTable();

module.exports = pool;
