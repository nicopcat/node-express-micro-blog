const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blog')

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


app.get('/', (req, res) => {
  // res.render('index',{title: 'HomePage', blogs:blogs});
  res.redirect('/blogs');
})

app.get('/about', (req, res) => {
  res.render('about',{title: 'About'});
})

app.get('/new', (req, res) => {
  res.render('new',{title: '写文章'});
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((r) => {
    res.redirect('/blogs')
  }).catch((err) => {
    console.log(err);
  })
})

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1}).then((r) => {
    res.render('index',{title: 'About', blogs: r});
   }).catch((err) => {
    console.log(err);
  })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then(r => {
    res.render('details', {
      title: 'Blog details',
      blog: r
    });
   }).catch((err) => {
    console.log(err);
  })
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then(r => {
    res.json({ redirect: '/blogs' });
   }).catch((err) => {
    console.log(err);
  })
})


// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: '404'});
})