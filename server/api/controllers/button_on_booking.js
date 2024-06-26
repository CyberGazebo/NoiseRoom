const express = require('express');
const pool = require('../app');

const app = express();

// Зададим порт, на котором будет работать сервер.
const PORT = process.env.PORT || 3000;

// Загрузим свободное и забронированное время из базы данных для выбранной даты.
const getTimeSlots = async (selectedDate) => {
  try {
    // Запрос для получения всех временных слотов на выбранную дату.
    const query = {
      text: `
        SELECT time
        FROM generate_series(
          '00:00'::time,
          '23:59'::time,
          '1 hour'::interval
        ) AS time
        LEFT JOIN (
          SELECT time
          FROM booking_blocks
          WHERE date = $1
        ) AS booked_slots ON generate_series.time = booked_slots.time
        WHERE booked_slots.time IS NULL
        ORDER BY generate_series.time;
      `,
      values: [selectedDate],
    };

    // Выполним запрос к базе данных.
    const result = await pool.query(query);

    // Преобразуем результат в массив доступных временных слотов.
    const timeSlots = result.rows.map(row => row.time);

    return timeSlots;
  } catch (error) {
    console.error('Error fetching time slots:', error);
    throw error;
  }
};

// Группируем временные слоты на утро, день и вечер.
const groupTimeSlots = (timeSlots) => {
  const morningSlots = [];
  const daySlots = [];
  const eveningSlots = [];

  // Разделяем временные слоты на утро, день и вечер.
  timeSlots.forEach(time => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) {
      morningSlots.push(time);
    } else if (hour >= 12 && hour < 18) {
      daySlots.push(time);
    } else {
      eveningSlots.push(time);
    }
  });

  return { morningSlots, daySlots, eveningSlots };
};

// Обработчик маршрута для отображения кнопок доступного времени.
exports.getAvailableTime = async (req, res) => {
  try {
    // Получим выбранную дату из запроса.
    const selectedDate = req.params.date;

    // Получим доступные временные слоты для выбранной даты.
    const timeSlots = await getTimeSlots(selectedDate);

    // Группируем временные слоты на утро, день и вечер.
    const { morningSlots, daySlots, eveningSlots } = groupTimeSlots(timeSlots);

    // Отправим данные о доступных временных слотах в качестве ответа.
    res.json({ morningSlots, daySlots, eveningSlots });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Запустим сервер на выбранном порту.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
