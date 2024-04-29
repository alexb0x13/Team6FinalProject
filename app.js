const express = require('express');
const morgan = require('morgan');
var cors = require('cors')

// express app 

const bodyParser = require('body-parser')
const Course = require('./models/course')
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
const router = express.Router()

router.get('/courses', async(req, res) =>{
  try {
    const courses = await Course.find({})
    res.send(courses)
    console.log(courses)
  }
  catch (err) {
    console.log(err)
  }
});

app.post('/teachers', async(req, res) =>{
  try {
    console.log(req.body)
    const course = new Course(req.body)
    await course.save()
    console.log(course)

    res.render('teachers', { title: 'Teachers' } );
    
  }catch(err) {
    res.status(400).send(err)
  }
})

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const courses = await Course.find({});
  res.render('index', { title: 'Home', courses });
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