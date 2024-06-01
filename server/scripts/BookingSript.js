const pool = require('../models/Booking');
const userPool = require('../models/User');

// Блокировка времени
exports.blockTime = async (req, res) => {
    const { date, time } = req.body;

    const expiresAt = new Date(Date.now() + 5 * 60000); // 5 минут

    const blockTimeQuery = {
        text: `INSERT INTO booking_blocks (date, time, expires_at) VALUES ($1, $2, $3) ON CONFLICT (date, time) DO NOTHING RETURNING *`,
        values: [ date, time, expiresAt],
    };

    try {
        const result = await pool.query(blockTimeQuery);
        if (result.rowCount === 0) {
            return res.status(409).json({ error: 'Время уже заблокировано другим пользователем.' });
        }
        res.status(200).json({ message: 'Время заблокировано на 5 минут.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при блокировке времени.' });
    }
};

// Создание бронирования с проверкой блокировок
exports.createBooking = async (req, res) => {
    const { user_id, date, time, duration, recording, status, name, email } = req.body;

    // Проверка на существующего пользователя
    let userId = user_id;
    if (!user_id) {
        const createUserQuery = {
            text: 'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
            values: [name, email, 'password', 'client'],
        };
        const userResult = await userPool.query(createUserQuery);
        userId = userResult.rows[0].id;
    }

    // Проверка на существующую блокировку
    const checkBlockQuery = {
        text: `SELECT * FROM booking_blocks WHERE date = $1 AND time = $2 AND expires_at > NOW()`,
        values: [userId, date, time],
    };

    try {
        const blockResult = await pool.query(checkBlockQuery);
        if (blockResult.rowCount === 0) {
            return res.status(409).json({ error: 'Время не заблокировано или блокировка истекла.' });
        }

        const createBookingQuery = {
            text: `INSERT INTO bookings (user_id, date, time, duration, recording, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [userId, date, time, duration, recording, status],
        };

        const result = await pool.query(createBookingQuery);
        
        // Удаление блокировки после успешного бронирования
        const deleteBlockQuery = {
            text: `DELETE FROM booking_blocks WHERE date = $1 AND time = $1`,
            values: [userId, date, time],
        };
        await pool.query(deleteBlockQuery);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при создании бронирования.' });
    }
};
