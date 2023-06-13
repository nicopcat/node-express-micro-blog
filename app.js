const express = require('express');
const app = express();

// register view engine
app.set('view engine','ejs')

app.listen(3000);

app.get('/', (req, res) => {
  // res.send('<p>using express!</p>');
  // res.sendFile('./views/index.html', {root:__dirname});
  const blogs = [
    { title: '玩玩Node.js', content: '好好玩好好玩好好玩' },
    {title:'东门沙角', content:'好好玩好好玩好好玩'},
    {title:'天气', content:'今天天气不错，但下午又热了起来'},

  ]
  res.render('index',{title: 'HomePage', blogs:blogs});
})

app.get('/about', (req, res) => {
  res.render('about',{title: 'About'});
})

// redirects
app.get('/about-me', (req, res) => {
  res.redirect('/about',{title: 'About'})
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: '404'});
})