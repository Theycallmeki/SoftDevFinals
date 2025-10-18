const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const recipeRoutes = require('./routes/recipeRoutes'); // ✅ renamed
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:3000', // React
  'http://localhost:8080',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true, // ✅ allow cookies
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ PostgreSQL connection
sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connected!'))
  .catch(err => console.error('❌ DB connection error:', err));

// ✅ Sync models
sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ Sync error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes); // ✅ updated base route

// ✅ Root endpoint
app.get('/', (req, res) => res.send('🚀 Express API is running!'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
