import pg from 'pg';
const { Pool } = pg;

// Create a new connection pool
const pool = new Pool({
  user: 'gotro', // database username
  host: 'localhost', // database host
  database: 'codes', //  database name
  password: 'msgistasty', //  database password
  port: 5432, // PostgreSQL default port
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
});

// Export the connection pool for use in other parts of your application
export default pool;
