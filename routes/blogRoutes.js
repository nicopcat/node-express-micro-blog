const express = require('express');
const blogControllers = require('../controllers/blogController');
const router = express.Router();

// 主页
router.get('/', blogControllers.blog_index);

// 关于页
router.get('/about', blogControllers.blog_about);

// 新建文章页
router.get('/new', blogControllers.blog_new);

// 新增文章
router.post('/blogs', blogControllers.blog_add_new);

// 获取所有文章列表
router.get('/blogs', blogControllers.blog_all_posts);

// 获取某一篇文章详情
router.get('/blogs/:id',  blogControllers.blog_detail);

// 删除某文章
router.delete('/blogs/:id', blogControllers.blog_delete);

// 导出路由
module.exports = router;