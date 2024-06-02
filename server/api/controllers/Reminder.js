const pool = require('../Model/Booking');
const nodemailer = require('nodemailer');
const VK = require('vk-io');
const sms = require('sms');

// Функция для отправки напоминаний
exports.sendReminder = async () => {
  // SQL-запрос для выбора бронирований, которым необходимо отправить напоминание
  const reminderQuery = {
    text: `SELECT b.id, b.date, b.time, u.email, u.vkid, u.phonenumber FROM bookings b JOIN users u ON b.user_id = u.id WHERE b.status = 'Запланирован' AND (b.date - NOW()) IN (INTERVAL '1 day', INTERVAL '12 hours', INTERVAL '2 hours')`,
  };

  try {
    // Выполняем запрос
    const result = await pool.query(reminderQuery);

    // Проходим по результатам и отправляем напоминания
    result.rows.forEach(async (row) => {
      const { id, date, time, email, vkid, phonenumber } = row;

      // Отправка Email-напоминания
      if (email) {
        await sendEmail(email, `Напоминание о бронировании`, `Ваше бронирование запланировано на ${date} в ${time}.`);
      }

      // Отправка сообщения ВКонтакте
      if (vkid) {
        await sendVKMessage(vkid, `Ваше бронирование запланировано на ${date} в ${time}.`);
      }

      // Отправка SMS-напоминания
      if (phonenumber) {
        await sendSMS(phonenumber, `Ваше бронирование запланировано на ${date} в ${time}.`);
      }
    });

  } catch (err) {
    console.error(err);
  }
};

// Функция для отправки Email
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noiseroombookingsite@gmail.com',
      pass: 'awH2nTWcCaB_',
    },
  });

  const mailOptions = {
    from: 'noiseroombookingsite@gmail.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};


// Функция для отправки сообщения ВКонтакте
const sendVKMessage = async (vkid, message) => {
  const vk = new VK.VK({
    token: 'your_vk_token',
  });

  await vk.api.messages.send({
    user_id: vkid,
    message,
    random_id: Math.floor(Math.random() * 1000000),
  });
};

// Функция для отправки SMS
const sendSMS = async (phoneNumber, message) => {
  await sms.send({
    to: phoneNumber,
    text: message,
  });
};
