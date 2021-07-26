const express = require('express');
const errors = require('../errors/common');
const router = express.Router();
const quotes = require('../services/quotes');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../services/config');

const users = [];
let id = 1;

router.get('/users', async function (req, res, next) {
  try {
    res.json(await quotes.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting articles `, err.message);
    next(err);
  }
});


router.post('/users', function (reg, res) {
  const payload = {
    id: id,
    firstname: reg.body.firstname,
    lastname: reg.body.lastname,
    birthday: reg.body.birthday
  };
  ++id;
  users.push(payload);
  res.status(200).json(payload);
});

router.get('/users/:userID', async (reg, res) => {
    const userID = parseInt(reg.params.userID);

    const rows = await db.query(
      'SELECT * FROM users WHERE user_id = $1',
      [userID],
    );

    const data = helper.emptyOrRows(rows)
    // res.status(404).json(errors.NOT_FOUND_404);
    res.status(200).json(data[0])
  }
);


module.exports = router;