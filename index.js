const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/blogRoutes');

// connect to MongoDB
const dbURI = 'mongodb+srv://nekolas:admin123@webappcluster.rxnnbvp.mongodb.net/learnNodeDB';

// const dbURI = 'mongodb+srv://admin:admin123@testapi.42jmqot.mongodb.net/Node-API?retryWrites=true&w=majority'


// register view engine
app.set('view engine','ejs')

app.use(morgan('tiny'));
// middleware for static files
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

// routes
app.use(router);
// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: '404'});
})

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((r) => {
  console.log('connecting to db');
  app.listen(3003,()=>{
    console.log('服务器启动成功')
})
}).catch((err) => {
  console.log(err);
});
