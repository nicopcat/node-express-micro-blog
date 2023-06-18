const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const blogRoutes = require('./routes/blogRoutes');

// connect to MongoDB
const dbURI = 'mongodb+srv://nekolas:admin123@webappcluster.rxnnbvp.mongodb.net/learnNodeDB';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((r) => {
  console.log('connecting to db');
  app.listen(3003);
}).catch((err) => {
  console.log(err);
});

// register view engine
app.set('view engine','ejs')

app.use(morgan('tiny'));
// middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// routes
app.use('/blogs',blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: '404'});
})
