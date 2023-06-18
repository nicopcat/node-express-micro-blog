const Blog = require('../models/blog');

const blog_index = (req, res) => {
  res.render('index',{title: '首页'});
}

const blog_about = (req, res) => {
  res.render('about',{title: '关于'});
}
const blog_new = (req, res) => {
  res.render('new',{title: '写文章'});
}
const blog_add_new = (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((r) => {
    res.redirect('/blogs')
  }).catch((err) => {
    console.log(err);
  })
}
const blog_all_posts = (req, res) => {
  Blog.find().sort({ createdAt: -1}).then((r) => {
    res.render('blogs',{title: '所有文章', blogs: r});
   }).catch((err) => {
    console.log(err);
  })
}
const blog_detail = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then(r => {
    res.render('details', {
      title: 'Blog details',
      blog: r
    });
   }).catch((err) => {
    console.log(err);
  })
}
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then(r => {
    res.json({ redirect: '/blogs' });
   }).catch((err) => {
    console.log(err);
  })
}
module.exports = {
  blog_index,
  blog_about,
  blog_new,
  blog_add_new,
  blog_all_posts,
  blog_detail,
  blog_delete,
}