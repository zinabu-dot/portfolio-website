// Keep Render service awake
import https from 'https';

const RENDER_URL = 'https://dgd-dfdsf-jyar.onrender.com';

const pingServer = () => {
  https.get(RENDER_URL, (res) => {
    console.log(`Ping: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log('Ping error:', err.message);
  });
};

// Ping every 14 minutes
setInterval(pingServer, 14 * 60 * 1000);

console.log('Keep-alive service started');