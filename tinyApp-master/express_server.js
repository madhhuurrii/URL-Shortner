//----Calling the Express JS---//
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');

//----Helper Functions----//

//gens random 6 char string
const { generateRandomString } = require('./helpers.js');

//Searches database for email, if found returns matching User object
const { getUserByEmail } = require('./helpers.js');

//returns object of URL's with user_ID matching the accounts UserID
const { urlsForUser } = require('./helpers.js');


const app = express();
const PORT = 8080;
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

//----DATA----//

const urlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: 'defaut' },
  "9sm5xK": { longURL: "http://www.google.com", userID: 'default' }
};


const users = {
  'userRandomID': {
    id: "userRandomID",
    email: 'user@example.com',
    password: 'purple-monkey-dinosaur'
  },
  'user2RandomID': {
    id: 'user2RandomID',
    email: 'user2@example.com',
    password: 'dishwasher-funk'
  }
};


//------ROUTING------//

app.get("/", (req, res) => {

  //if not logged in
  if (!req.session.user_id) {
    res.redirect('/login');
    return;
  }
  res.redirect('/urls');
});


app.get('/urls', (req, res) => {

  // templateVars.urls updated based on user -> only displays users URL's
  const templateVars = {
    urls: urlsForUser(req.session.user_id, urlDatabase),
    user_id: req.session.user_id,
    users,
    incorrectInfo: false,
  };
  // if not logged in
  if (!req.session.user_id) {
    templateVars['notLoggedIn'] = true;
    res.render('login', templateVars);
    return;
  }
  res.render('urls_index', templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls/new", (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/login');
    return;
  }
  const templateVars = {
    user_id: req.session.user_id,
    users
  };
  res.render('urls_new', templateVars);
});


// ---- Login Routes ----//

app.get('/login', (req, res) => {
  const incorrectInfo = false;
  const templateVars = {
    user_id: req.session.user_id,
    users,
    incorrectInfo,
    notLoggedIn: false
  };
  //if logged in
  if (req.session.user_id) {
    res.redirect('/urls');
    return;
  }
  res.render('login', templateVars);
});

app.post('/login', (req, res) => {
  let loginEmail = req.body.email;
  let loginPass = req.body.password;

  if (getUserByEmail(loginEmail, users)) {
    const loginUser = getUserByEmail(loginEmail, users);
    if (bcrypt.compareSync(loginPass, loginUser.password)) {
      req.session.user_id = loginUser.id;
      res.redirect('/urls');
      return;
    }
  }
  const templateVars = {
    incorrectInfo: true,
    user_id: req.session.user_id,
    users,
    notLoggedIn: false
  };
  res.status(403);
  res.render('login', templateVars);
  return;
});


app.delete('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

// ---- Register Routes ----//

app.get('/register', (req, res) => {
  const emailInUse = false;
  const templateVars = {
    user_id: req.session.user_id,
    users,
    emailInUse
  };
  //if already logged in, redirect to /urls
  if (req.session.user_id) {
    res.redirect('/urls');
    return;
  }
  res.render('registration', templateVars);
});


app.post('/register', (req, res) => {

  //If email already exists
  if (getUserByEmail(req.body.email, users)) {
    const emailInUse = true;
    const templateVars = {
      user_id: req.session.user_id,
      users,
      emailInUse
    };
    res.status(400);
    res.render(`registration`, templateVars);
    return;
  }
  if (req.body.email.length < 1 || req.body.password.length < 1) {
    res.status(400);
    res.send(`status code: ${res.statusCode} You must register with a valid Email and password`);
    return;
  }
  //user creation
  const randID = generateRandomString();
  const hashedPass = bcrypt.hashSync(req.body.password, 10);

  users[randID] = {
    id: randID,
    email: req.body.email,
    password: hashedPass
  };
  req.session.user_id = users[randID].id;
  res.redirect('/urls');
});

// ---- ShortURL Creation ----//

app.post("/urls", (req, res) => {
  //Login check
  if (!req.session.user_id) {
    res.redirect('/login');
    return;
  }
  //New URL addition
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = {
    longURL: req.body.longURL, userID: req.session.user_id
  };
  res.redirect(`/urls/${shortURL}`);
});

// ---- Specific ShortURL View, Edit, Delete ---- //

app.get('/urls/:shortURL', (req, res) => {
  if (!urlDatabase[req.params.shortURL]) {
    res.status(404);
    res.render('invalid_short');
    return;
  }
  // permissions check
  if (urlDatabase[req.params.shortURL].userID === req.session.user_id) {
    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[req.params.shortURL].longURL,
      user_id: req.session.user_id,
      users
    };
    res.render('urls_show', templateVars);
    return;
  }
  res.status(401);
  res.render('invalid_short');
});

app.patch('/urls/:shortURL', (req, res) => {
  // permissions check
  if (urlDatabase[req.params.shortURL].userID === req.session.user_id) {
    urlDatabase[req.params.shortURL].longURL = req.body.updateURL;
    res.redirect(`/urls`);
    return;
  }
  res.status(401);
  res.render('invalid_short');
});


app.delete('/urls/:shortURL/delete', (req, res) => {
  if (urlDatabase[req.params.shortURL].userID === req.session.user_id) {
    delete urlDatabase[req.params.shortURL];
    res.redirect('/urls');
    return;
  }
  res.status(401);
  res.render('invalid_short');
});

// ---- shortURL -> LongURL Redirection ---- //

app.get('/u/:shortURL', (req, res) => {
  if (!urlDatabase[req.params.shortURL]) {
    res.status(404);
    res.render('invalid_short');
    return;
  }
  res.redirect(urlDatabase[req.params.shortURL].longURL);
});

app.get('*', (req, res) => {
  res.render('invalid_short');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
