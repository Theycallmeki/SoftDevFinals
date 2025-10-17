const { Sequelize } = require('sequelize');

// Detect if running inside Docker
// Inside Docker, the database hostname should be "postgres-db" (from docker-compose.yml)
// Locally, it should connect to "localhost"
const host = process.env.DOCKER_ENV ? 'postgres-db' : 'localhost';

const sequelize = new Sequelize('nigga', 'postgres', '12345678', {
  host: host,
  port: 5432,
  dialect: 'postgres',
  logging: false,
  retry: {
    match: [/ECONNREFUSED/],
    max: 10,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

module.exports = sequelize;
