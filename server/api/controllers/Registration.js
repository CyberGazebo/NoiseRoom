const bcrypt = require('bcrypt');
const pool = require('../Model/User');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Вставляем нового пользователя в базу данных
        const query = {
            text: `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
            values: [name, email, hashedPassword, role || 'user']
        };

        const result = await pool.query(query);
        const newUser = result.rows[0];

        res.status(201).json({ message: 'Регистрация прошла успешно', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
    }
};
