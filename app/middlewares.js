const db = require('./client');

const initCookie = (req, res, next) => {
  if (!req.cookies.lang) {
    res.cookie('lang', 'fr');
  }

  next();
};

const fetchLanguages = async (req, res, next) => {
  const {rows} = await db.query('SELECT * FROM language ORDER BY name;');

  res.locals.languages = rows;

  next();
};

const fetchNS = async (req, res, next) => {

  const ns = [ 'main', 'home' ];

  const {rows} = await db.query(`SELECT term.label, translation.content
    FROM translation
    JOIN language ON translation.language_id = language.id AND language.iso_code = $1
    JOIN term ON translation.term_id = term.id
    JOIN namespace ON term.namespace_id = namespace.id AND namespace.label = ANY($2::text[]);`, [req.cookies.lang, ns]);

  console.log(rows);

  const translations = rows.reduce((t, { label, content }) => { t[label] = content; return t; }, {});

  res.locals.t = (label) => translations[label] ?? `#${label} - ${req.cookies.lang}`;

  next();
};

const render = (req, res) => {
  res.render('home');
};

module.exports = {
  initCookie,
  fetchLanguages,
  fetchNS,
  render
};