var express = require('express');
var router = express.Router();
var Posts = require('../models/post')
var User = require('../models/user');
var express = require('express');
var jwt = require('jwt-simple');
var secret = 'xxx';
 
// HS256 secrets are typically 128-bit random strings, for example hex-encoded: 
// var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex) 
 
// encode 
// var token = jwt.encode(payload, secret);
 
// decode 
// var decoded = jwt.decode(token, secret);
// console.log(decoded); //=> { foo: 'bar' } 

router.get('/', function (req, res, next) {
  res.json("test")
});
router.get('/post', function (req, res) {
  Posts.find({}, (err, data) => {
    //  console.log(data)
    res.json({
      title: '文章',
      items: data
    })
  });
})
router.post('/post', function (req, res) {
  console.log(req.body)
  var payload = { foo: 'bar' };  
  var token = jwt.encode(payload, secret);
  res.json({
    token: token,
    user: 'test'
  });
})
module.exports = router;