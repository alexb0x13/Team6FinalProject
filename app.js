const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  const blogs = [
    
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/teachers', (req, res) => {
  res.render('teachers', { title: 'Teachers' });
});

app.get('/students', (req, res) => {
  res.render('students', { title: 'Students' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});