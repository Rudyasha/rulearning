const db = require('./db');
const helper = require('../helper');
const config = require('./config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    "SELECT * FROM articles LIMIT $1 OFFSET $2",
    [config.listPerPage, offset]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getUsers(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    "SELECT * FROM users LIMIT $1 OFFSET $2",
    [config.listPerPage, offset]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}





module.exports = {
  getMultiple,
  getUsers
}