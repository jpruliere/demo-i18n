const { Router } = require('express');
const router = new Router();


const {
  initCookie,
  fetchLanguages,
  fetchNS,
  render
} = require('./middlewares');

router.get('/favicon.ico', (req, res) => res.send());

// init lang cookie with fr
router.use(initCookie);

// fetch languages
router.use(fetchLanguages);

// fetch translations then render
router.get('/home', fetchNS, render);

module.exports = router;