const pool = require('../app');
const express = require('express');
const app = express();
app.use(express.json());

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

app.post('/update-user', async (req, res) => {
  const { id, username, email, password, role, VKID, PhoneNumber } = req.body;

  const query = {
      text: `UPDATE users SET username = $1, email = $2, password = $3, role = $4, VKID = $5, PhoneNumber = $6 WHERE id = $7`,
      values: [username, email, password, role, VKID, PhoneNumber, id],
  };

  try {
      await pool.query(query);
      res.status(200).json({ message: 'Пользователь обновлен.' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при обновлении пользователя.' });
  }
});

app.listen(3000, () => console.log('Сервер работает на порту 3000'));