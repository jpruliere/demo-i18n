require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const router = require('./app/router');

const port = process.env.PORT;

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use('/assets', express.static('./public'));

app.use(router);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));