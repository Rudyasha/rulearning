const DEBUG = false;

const config = {
  db: DEBUG ? {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
  } : {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  } ,
  listPerPage: 10
}

module.exports = {
  db: config.db,
  listPerPage: config.listPerPage
};