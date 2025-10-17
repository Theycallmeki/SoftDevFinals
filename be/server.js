const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// ✅ Dynamic CORS setup
const allowedOrigins = [
  'http://localhost:8080', // Vue in Docker
  'http://localhost:3000', // Vite local dev
  'http://localhost:5143', // previous local setup
  'http://127.0.0.1:8080',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ PostgreSQL connection test
sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connected!'))
  .catch(err => console.error('❌ DB connection error:', err));

// ✅ Sync models
sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ Sync error:', err));

// ✅ Routes
app.use('/api/items', itemRoutes);

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 Express API is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
