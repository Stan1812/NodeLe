var express = require('express');
var router = express.Router();
var express = require('express');
var User = require('../models/user');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'hello,Node'
  });
});
router.get('/list', function (req, res) {
  res.render('list', {
    title: 'list',
    items: [2017, 'libiao', 'express', 'nodejs']
  })
})
router.get('/hello', function (req, res) {
  res.send('the time is ' + new Date().toString())
})
router.get('/user/:username', function (req, res) {
  res.send('user:' + req.params.username);
})
router.get('/post', function (req, res) {
  res.render('post', {
    title: '发布'
  })
})
router.post('/post', function (req, res) {
  res.render('post', {
    title: '发布'
  })
  res.send('post success' + new Date().toString())
})
router.get('/reg', function (req, res) {
  res.send('get reg suc' + new Date().toString())
})
router.post('/reg', function (req, res) {
  var postData = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    email: req.body.email
  };
  // User.findOne({username: postData.username}, function (err, data) {
  //     if (data) {
  //         res.send('用户名已被注册');
  //     } else {
  //         // 保存到数据库
  //         User.create(postData, function (err, data) {
  //             if (err) throw err;
  //             console.log('注册成功');
  //             res.redirect('/');      // 重定向到所用用户列表
  //         })
  //     }
  // });
  // res.send('doreg success'+ new Date().toString())
  User.create(postData, function (err, data) {
    console.log(postData)
    if (err) throw err;
    console.log('注册成功');
    res.redirect('/'); // 重定向到所用用户列表
  })
})
router.get('/login', function (req, res) {
  res.render('login', {
    title: '登录'
  })
  res.send('get log succ' + new Date().toString())
})
router.post('/login', function (req, res) {
  res.send('done login' + new Date().toString())
})
router.get('/logout', function (req, res) {
  res.send('logout' + new Date().toString())
})
module.exports = router;
