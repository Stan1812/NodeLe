var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hello,Node' });
});
router.get('/list',function(req,res){
  res.render('list',{
    title:'list',
    items:[2017,'libiao','express','nodejs']
  })
})
router.get('/hello',function(req,res){
  res.send('the time is '+ new Date().toString())
})
router.get('/user/:username',function(req,res){
  res.send('user:'+req.params.username);
})
router.get('/post',function(req,res){
  res.render('post',{
    title:'发布'
  })
})
router.post('/post',function(req,res){
  res.render('post',{
    title:'发布'
  })
  res.send('post success'+ new Date().toString())
})
router.get('/reg',function(req,res){
  res.send('get reg suc'+ new Date().toString())
})
router.post('/reg',function(req,reg){
  res.send('doreg success'+ new Date().toString())
})
router.get('/login',function(req,res){
  res.render('login',{
    title:'登录'
  })
  res.send('get log succ'+ new Date().toString())
})
router.post('/login',function(req,res){
  res.send('done login'+ new Date().toString())
})
router.get('/logout',function(req,res){
  res.send('logout'+ new Date().toString())
})
module.exports = router;
