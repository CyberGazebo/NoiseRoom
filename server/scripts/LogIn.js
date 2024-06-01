const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/User'); // Assuming User model is set up with the pool connection

const secretKey = 'your_jwt_secret_key'; // Замените на ваш секретный ключ

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Ищем пользователя по email
        const query = {
            text: `SELECT * FROM users WHERE email = $1`,
            values: [email]
        };

        const result = await pool.query(query);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Неправильный email или пароль' });
        }

        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Неправильный email или пароль' });
        }

        // Создаем JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            secretKey,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Авторизация прошла успешно', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при авторизации пользователя' });
    }
};
