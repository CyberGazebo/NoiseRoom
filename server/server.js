const express = require('express');
const cors = require('cors');
const app = express();
const scriptRoutes = require('./routes/scriptRoutes');

app.use(express.json());
app.use(cors());

// Определяем маршруты
app.use('/api', scriptRoutes);

// Создаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
