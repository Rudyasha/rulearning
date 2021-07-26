const articles = require('./articles/routers')
const users = require('./users/routers')

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use('/api/v1/', articles)
app.use('/api/v1/', users)


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:3000`)
})
