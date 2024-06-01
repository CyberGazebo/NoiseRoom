const pool = require('../app');

const createUserTable = async () => {
  const query = {
    text: `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE CHECK (username ~'^[a-zA-Z0-9_]+$'),
      email VARCHAR(100) UNIQUE CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
      password VARCHAR(255),
      role VARCHAR(10) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
      VKID VARCHAR(50),
      PhoneNumber VARCHAR(15)
    )`,
  };
  await pool.query(query);
};

createUserTable();

module.exports = pool;