let player;
const socket = io(); // Подключение к WebSocket серверу

// Инициализация YouTube API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '720',
    width: '1280',
    videoId: '',
    playerVars: {
      playsinline: 1,
      autoplay: 0,
      controls: 1,
      rel: 0,
      vq: 'hd2160' // 4K
    }
  });
}

// Загрузка видео
document.getElementById('load-video').addEventListener('click', () => {
  const url = document.getElementById('video-url').value;
  const videoId = extractVideoId(url);

  if (videoId) {
    player.loadVideoById(videoId);
    socket.emit('sync', { action: 'load', videoId }); // Передача события другим пользователям
  } else {
    alert('Invalid YouTube URL');
  }
});

// Функция для получения ID видео из URL
function extractVideoId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

// Получение событий от сервера
socket.on('sync', (data) => {
  if (data.action === 'load') {
    player.loadVideoById(data.videoId);
  }
});
