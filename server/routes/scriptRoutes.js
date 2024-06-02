const express = require('express');
const router = express.Router();
const reminder = require('../controllers/Reminder');
const userController  = require('../controllers/Registration');
const userController = require('../controllers/LogIn');
const financialController = require('../controllers/Financial');
const timeController = require('../controllers/button_on_booking');
const bookingController = require('../controllers/BookingSript');


// Маршрут для отправки напоминаний
router.get('/sendReminder', async (req, res) => {
  try {
    await reminder.sendReminder();
    res.status(200).json({ message: 'Напоминания успешно отправлены' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при отправке напоминаний' });
  }
});
// Маршрут для регистрации пользователя
router.post('/register', userController.register);
// Маршрут для авторизации пользователя
router.post('/login', userController.login);
// Маршрут для создания отчета о заказах
router.post('/order-report', financialController.createOrderReport);

// Маршрут для создания графика активности
router.get('/activity-chart', financialController.createActivityChart);


// Маршрут для отображения доступного времени.
router.get('/available-time/:date', timeController.getAvailableTime);

// Маршрут для блокировки времени
router.post('/block-time', bookingController.blockTime);

// Маршрут для создания бронирования
router.post('/create-booking', bookingController.createBooking);


module.exports = router;
