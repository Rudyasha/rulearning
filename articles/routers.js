const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../services/config');


router.get('/articles', async function (req, res, next) {
  try {
    res.json(await quotes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting articles `, err.message);
    next(err);
  }
});

router.post('/articles', async (req, res) => {
  const title = req.body.title;

  if (typeof title !== "string") {
    res.status(400).json({
      success: false,
      message: "Title must be string",
    })
  }
  if (!title) {
    res.status(400).json({
      success: false,
      message: "Title have not be null",
    })
  }

  {
    const result = await db.query(
      'INSERT INTO articles(title, subtitle) VALUES ($1, $2) RETURNING *',
      [req.body.title, req.body.subtitle]
    );
    res.status(201).json(result)
  }
});
// let message = 'Error in creating';

//ger articles by id
router.get('/articles/:articleId', async (req, res) => {
  const articleId = parseInt(req.params.articleId);

  const rows = await db.query(
    'SELECT * FROM articles WHERE id = $1',
    [articleId],
  );

  const data = helper.emptyOrRows(rows);
  res.status(200).json(data[0])
});


/*res.status(404).json({
success: false,
message: "Not found",*/

router.put('/articles/:articleId', async (req, res) => {
  const articleId = parseInt(req.params.articleId);
  const {title, description} = req.body

  const result = await db.query(
    'UPDATE articles SET title = $1, description = $2 WHERE id = $3',
    [title, description, articleId],
  );
      res.status(200).send(`User modified with ID: ${articleId}`).json(result)
    });

//delete articles by id
router.delete('/articles/:articleId', async (req, res) => {
  const articleId = parseInt(req.params.articleId); // reference to /articles/:articleId

  const result = await db.query(
    'DELETE FROM articles WHERE id = $1',
    [articleId],
  );
  res.status(204).json(result);
  /*else {
   if (!articleId) {
     res.status(404).json({
       success: false,
       message: "Not found",
     })
   }*/
});

/*for (let index = 0; index < articles.length; index++) {
  if (articles[index].id === articleId) {
    articles.splice(index);
    res.status(204)
    res.send()
  }
}*/

/* res.status(404).json({
   success: false,
   message: "Not found",
 })
});*/

module.exports = router;