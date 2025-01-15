const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Статические файлы
app.use(express.static('.'));

// WebSocket для синхронизации
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sync', (data) => {
    socket.broadcast.emit('sync', data); // Отправка данных всем пользователям
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
