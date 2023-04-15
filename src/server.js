// Because we have babel now, we can use ES Module syntax
// const express = require('express'); <- instead of this
import express from 'express';
import morgan from 'morgan';

const PORT = 4000;
const app = express();
const logger = morgan('dev');

function handleHome(req, res) {
  res.send('Hello');
}

const handleProtected = (req, res) => {
  res.send('<h2>Welcome to the Private Lounge</h2>');
};

app.use(logger);
app.get('/', handleHome);
app.get('/hello', (req, res) => {
  res.send('<h1> MY NAME IS BONNIE</h1>');
});
app.get('/protected', handleProtected);

const handleListening = () => {
  console.log(`I am listening maintenant on localhost:${PORT}`);
};
app.listen(PORT, handleListening);
