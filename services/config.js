const config = {
  db: {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
  },
  listPerPage: 10
}

module.exports = {
  db: config.db,
  listPerPage: config.listPerPage
};