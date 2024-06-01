// Папка ‘script’:
const express = require('express');
const router = express.Router();

const BookingScript = require('../script/BookingScript');
const ButtonOnBooking = require('../script/button_on_booking');
const Financial = require('../script/Financial');
const LogIn = require('../script/LogIn');
const Registration = require('../script/Registration');
const Reminder = require('../script/Reminder');

// Маршруты для скриптов
router.post('/booking-script', (req, res) => {
    // Логика обработки скрипта для бронирования
});

router.post('/button-on-booking', (req, res) => {
    // Логика обработки кнопки при бронировании
});

// Добавьте маршруты для других скриптов по аналогии

module.exports = router;
