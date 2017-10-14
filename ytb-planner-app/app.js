const express = require('express');
var exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();

// Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vidjot-dev', {useMongoClient: true})
  .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// HandleBars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Process Form
app.post('/ideas', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if (!req.body.details) {
    errors.push({text: 'Please add some details'});
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
        .then(idea => {
          res.redirect('/ideas');
        });
  }
});

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});