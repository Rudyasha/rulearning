const articles = require('./articles/routers')
const users = require('./users/routers')

const express = require('express');

const app = express();

app.use(express.json())
app.use('/api/v1/', articles)
app.use('/api/v1/', users)


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})
