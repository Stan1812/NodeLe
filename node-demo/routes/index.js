var express = require('express');
var router = express.Router();
var express = require('express');
var Posts = require('../models/post')
var User = require('../models/user');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'hello,Node'
  });
});
// router.get('/list', function (req, res) {
//   res.render('list', {
//     title: 'list',
//     items: [2017, 'libiao', 'express', 'nodejs']
//   })
// })
// router.get('/user/:username', function (req, res) {
//   res.send('user:' + req.params.username);
// })
router.get('/post', function (req, res) {
  Posts.find({}, (err, data) => {
    //  console.log(data)
    res.render('post', {
      title: '文章',
      items: data
    })
  });
})

router.post('/post', function (req, res) {
  let postData = {
    title: req.body.title,
    content: req.body.content
  }
  Posts.findOne({
    title: postData.title
  }, function (err, data) {
    if (data) {
      res.send('文章已存在');
    } else {
      // 保存到数据库
      Posts.create(postData, function (err, data) {
        if (err) throw err;
        console.log('发表成功');
        res.redirect('/post'); // 重定向到所用用户列表
      })
    }
  });
})
router.get('/reg', function (req, res) {
  res.render('reg', {
    title: '注册'
  })
  // res.send('get log succ' + new Date().toString())
})
router.post('/reg', function (req, res) {
  var postData = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    email: req.body.email
  };
  User.findOne({
    username: postData.username
  }, function (err, data) {
    if (data) {
      res.send('用户名已被注册');
    } else {
      // 保存到数据库
      User.create(postData, function (err, data) {
        if (err) throw err;
        console.log('注册成功');
        res.redirect('/login'); // 重定向到所用用户列表
      })
    }
  });
  // res.send('doreg success'+ new Date().toString())
})
router.get('/login', function (req, res) {
  console.log('test',req.session.user)
  if (req.session.user) {
    res.redirect('/post')
  } else {
    res.render('login', {
      title: '登录'
    })
  }

  // res.send('get log succ' + new Date().toString())
})
router.post('/login', function (req, res) {
  console.log(req.body)

  var postData = {
    username: req.body.username,
    password: req.body.password,
  };
  User.findOne({
    username: postData.username
  }, function (err, data) {
    console.log('test;', data)
    if (data) {
      if (data.password = postData.password) {
       req.session.user=data
       console.log(req.session.user)
        console.log('login success')
        // res.send('登陆成功');
        res.redirect('/post');
      } else {
        console.log('password not matched')
        res.redirect('/login')
      }
    } else {
      console.log('login failed')
      res.redirect('/login')
    }
  });
  // res.send('doreg success'+ new Date().toString())
})
router.get('/logout', function (req, res) {
  req.session.user=null;
  res.redirect('/')
})
module.exports = router;