const { Pool } = require('pg');

const pool = new Pool({
  user: 'utc_gpfa_user',
  host: 'dpg-d29n41er433s739j54a0-a.oregon-postgres.render.com',
  database: 'utc_gpfa',
  password: 'JeM5ZpilgUjEQRLcF4DjOTQHJPkL5Dcf',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Necesario para Render
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
