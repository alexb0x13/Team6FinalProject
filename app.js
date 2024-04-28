const express = require('express');
const morgan = require('morgan');
var cors = require('cors')

// express app 

const bodyParser = require('body-parser')
const Course = require('./models/courses')
const app = express()
app.use(cors())

app.use(bodyParser.json())
const router = express.Router()

router.get('/courses', function(req, res) {
  let query = {}
  if (req.query.name) {
    query = {name : req.query.name}
  }
  // find method built into Mongoose
  Course.find(query, function(err, courses) {
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.json(courses)
    }
  })
})

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