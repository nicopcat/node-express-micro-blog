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

app.get('/', (req, res) => {
  // res.render('index',{title: 'HomePage', blogs:blogs});
  res.redirect('/blogs');
})

app.get('/about', (req, res) => {
  res.render('about',{title: 'About'});
})


app.get('/new', (req, res) => {
  // res.render('new',{title: 'New Post'});
  const blog = new Blog({
    title: '水终于送到了',
    snippets: '严重怀疑他们忘了',
    body: '从早上10点等到15点，后来出去打了个电话，问他们水为什么还不送过来。借口曰早上忙不过来，我看是忘记了。说了一通，15分钟后水就送到了。'
  })
  blog.save().then((r) => {
    console.log(r);
    res.send(r);
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

app.get('/single-blog', (req, res) => {
  Blog.findById('648972ae90c7b60531212d46').then((r) => {
    console.log(r);
    res.send(r);
   }).catch((err) => {
    console.log(err);
  })
})


// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: '404'});
})