const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Simuleerime andmebaasi kasutajate salvestamiseks
const users = [];

app.use((req, res, next) => {
    const isLogged = true; // Lisa siia päris autentimise kontroll
    res.locals.username = isLogged ? 'Kasutajanimi' : ''; // Lisa siia päris kasutajanime saamine
    next();
  });
  
// ...

// Päis (header)
app.use((req, res, next) => {
    res.locals.username = ''; // Alusta tühjana
    next();
  });
  
  // ...
  
  // Kuula porti
  app.listen(port, () => {
    console.log(`Server kuulab porti ${port}`);
  });  

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routid
app.get('/', (req, res) => {
  res.send('Tere tulemast avalehele!');
});

// Registreerimis leht
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html'); // Loo register.html fail ja lisa registreerimisvorm
});

// Registreerimine
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

// Login leht
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html'); // Loo login.html fail ja lisa sisselogimisvorm
});

// Autentimine
app.post('/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (user == null) {
    return res.redirect('/login');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.redirect('/profile');
    } else {
      res.redirect('/login');
    }
  } catch {
    res.status(500).send();
  }
});

// Valitud API integreerimine
// Lisa API kutse siia

// Kuula porti
app.listen(port, () => {
  console.log(`Server kuulab porti ${port}`);
});

// ...

// Kasutajaprofiili leht
app.get('/profile', (req, res) => {
    // Lisa siia kasutaja profiili HTML
    res.send('Profiilileht');
  });
  
  // Kontaktleht
  app.get('/contact', (req, res) => {
    // Lisa siia kontaktlehe HTML
    res.send('Kontaktleht');
  });
  
  // Kui kasutaja pole sisse loginud, suuna teda registreerimise või login lehele
  app.use((req, res, next) => {
    const isLogged = true; // Lisa siia päris autentimise kontroll
    if (!isLogged && req.url !== '/register' && req.url !== '/login') {
      res.redirect('/login');
    } else {
      next();
    }
  });
  
  // Kuula porti
  app.listen(port, () => {
    console.log(`Server kuulab porti ${port}`);
  });
  
  // ...

// Tagasiside süsteem
const feedbacks = [];

app.post('/feedback', (req, res) => {
  const feedback = req.body.feedback;
  feedbacks.push(feedback);
  res.redirect('/contact');
});

// Kasutajaprofiili leht
app.get('/profile', (req, res) => {
  // Saada kasutaja profiili info lehele
  res.render('profile', { username: res.locals.username });
});

// Kontaktleht
app.get('/contact', (req, res) => {
  // Saada tagasiside ja kontaktinfo lehele
  res.render('contact', { feedbacks });
});

// ...

// Päise muutujad
app.use((req, res, next) => {
    res.locals.username = ''; // Alusta tühjana
    res.locals.currentPage = req.path; // Salvesta praegune leht
    next();
  });
  
  // ...
  
  // Kuula porti
  app.listen(port, () => {
    console.log(`Server kuulab porti ${port}`);
  });
  // ...

// Stiilide ja skriptide serveerimine
app.use('/styles', express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'public')));

// ...
