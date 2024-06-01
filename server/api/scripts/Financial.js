const pool = require('../models/Financial');


// Создание отчета о заказах
exports.createOrderReport = async (req, res) => {
  const { startDate, endDate, period } = req.body;

  let orderReportQuery = {};

  if (startDate && endDate) {
    // Если указаны startDate и endDate, используем их для фильтрации данных
    orderReportQuery = {
      text: `SELECT id, date, time, duration, recording, cost FROM bookings WHERE date BETWEEN $1 AND $2`,
      values: [startDate, endDate],
    };
  } else if (period) {
    // Если указан период, используем его для фильтрации данных
    let dateCondition = '';
    if (period === 'month') {
      dateCondition = 'date > NOW() - INTERVAL \'1 month\'';
    } else if (period === 'half_year') {
      dateCondition = 'date > NOW() - INTERVAL \'6 months\'';
    } else if (period === 'year') {
      dateCondition = 'date > NOW() - INTERVAL \'1 year\'';
    } else {
      return res.status(400).json({ error: 'Неверный период' });
    }

    orderReportQuery = {
      text: `SELECT id, date, time, duration, recording, cost FROM bookings WHERE ${dateCondition}`,
    };
  } else {
    return res.status(400).json({ error: 'Необходимо указать либо диапазон дат, либо период' });
  }

  try {
    const result = await pool.query(orderReportQuery);
    const report = await generateExcelReport(result.rows); // Функция для генерации Excel отчета
    res.setHeader('Content-Disposition', 'attachment; filename=order_report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.status(200).send(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании отчета о заказах' });
  }
};

// Функция для генерации Excel отчета
const generateExcelReport = async (data) => {
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Отчет о заказах');

  worksheet.columns = [
    { header: 'Код', key: 'id', width: 10 },
    { header: 'Дата', key: 'date', width: 15 },
    { header: 'Время', key: 'time', width: 10 },
    { header: 'Длительность', key: 'duration', width: 15 },
    { header: 'Запись', key: 'recording', width: 20 },
    { header: 'Стоимость', key: 'cost', width: 15 },
  ];

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  // Подсчет итоговой суммы
  const totalSum = data.reduce((sum, row) => sum + parseFloat(row.cost), 0);
  worksheet.addRow({});
  worksheet.addRow({ id: 'Итого', cost: totalSum.toFixed(2) });

  // Сохранение отчета в буфер
  return workbook.xlsx.writeBuffer();
};


// Создание графика активности
exports.createActivityChart = async (req, res) => {
  const { period } = req.query;

  const activityChartQuery = {
    text: `SELECT date, COUNT(*) AS count FROM bookings WHERE status = 'Запланирован' GROUP BY date`,
  };

  if (period === 'week') {
    activityChartQuery.text += ' AND date > NOW() - INTERVAL \'1 week\'';
  } else if (period === 'month') {
    activityChartQuery.text += ' AND date > NOW() - INTERVAL \'1 month\'';
  } else if (period === 'year') {
    activityChartQuery.text += ' AND date > NOW() - INTERVAL \'1 year\'';
  }

  try {
    const result = await pool.query(activityChartQuery);
    const chartData = generateChartData(result.rows); // Функция для генерации данных для графика
    res.status(200).json(chartData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании графика активности' });
  }
};

// Функция для генерации данных для графика
const generateChartData = (data) => {
  // Преобразование данных в нужный формат для графика
  return data.map(row => ({ date: row.date, count: row.count }));
};
