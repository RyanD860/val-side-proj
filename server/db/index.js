const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  ssl: true
})

pool.on('connect', () => {
  console.log('Successfully connected to db');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};