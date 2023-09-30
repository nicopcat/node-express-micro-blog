const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config()
const path = require('path');
const router = require('./routes/blogRoutes');

const connectDB = require('./connectMongo')
connectDB()
// register view engine
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('tiny'));
// middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// routes
app.use(router);
// 404 page
app.use((req, res) => {
  res.status(404).render('404',{title: '404'});
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})