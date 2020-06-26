const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const userRoutes = require('./routes/users');
const courseRouter = require('./routes/courses');
const categoryRouter = require('./routes/categories');
const lessonRouter = require('./routes/lessons');

const app = express();

// Configuration
app.set('port', process.env.PORT || 4000);
app.use(cors())

// Database connection
const uri = 'mongodb+srv://dev:flZOUjB0tJboFVim@cluster0-v5nds.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true })
.then(db => console.log('Database connection successed'))
.catch(err => console.log('Error while connecting to database:', err)); 

// Middelwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/lessons', lessonRouter);
app.use('/users', userRoutes);

// Server init
app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}!`);
});
