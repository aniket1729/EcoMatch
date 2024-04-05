// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key'; // Change this to a secure secret key

// Sample database for users
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

// Middleware to authenticate user token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send('User registered successfully');
  } catch {
    res.status(500).send('An error occurred while registering the user');
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (!user) {
    return res.status(400).send('User not found');
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ username: user.username }, SECRET_KEY);
      res.cookie('token', accessToken, { httpOnly: true });
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid password');
    }
  } catch {
    res.status(500).send('An error occurred while logging in');
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send('Logout successful');
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
