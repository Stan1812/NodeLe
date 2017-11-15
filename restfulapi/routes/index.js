var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("test")
});
router.get('post',function(req,res,next){
  
})
module.exports = router;
