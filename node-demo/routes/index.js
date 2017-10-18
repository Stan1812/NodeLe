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
router.post('/post',function(req,res){
  res.send('post success')
})
router.get('reg',function(req,res){
  res.send('get reg suc')
})
router.post('reg',function(req,reg){
  res.send('doreg success')
})
router.get('login',function(req,res){
  res.send('get log succ')
})
router.post('login',function(req,res){
  res.send('done login')
})
router.get('logout',function(req,res){
  res.send('logout')
})
module.exports = router;
