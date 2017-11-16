var express = require('express');
var router = express.Router();
// var URL = require('url');
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

router.get('/', function(req, res, next) {
    res.json("test")
});
//获取文章，分页，每页6条
router.get('/articles', function(req, res) {
    console.log(req.query);
    const footsize = 6;
    let page = req.query.page;
    Posts.find({}, (err, data) => {
        let itemnum = page * footsize
        let len = data.length
        let nextpos = itemnum + footsize
        if (len > itemnum) {
            if ((len - itemnum) < footsize) {
                let arts = data.slice(itemnum, len)
                callback(arts)
            } else {
                let arts = data.slice(itemnum, nextpos)
                callback(arts)
            }

            function callback(arts) {
                res.json({
                    status: 1,
                    message: "获取成功",
                    items: arts,
                })
            }

        } else {
            res.json({
                message: '没有数据',
                status: 0
            })
        }
    });
})

//管理员登录
router.post('/login', function(req, res) {
    console.log(req.body)
    let postData = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({ username: postData.username }, function(err, data) {
        if (data) {
            if (data.password === postData.password) {
                let token = jwt.encode(postData, secret)
                res.json({
                    status: 1,
                    token: token,
                    message: '登陆成功'
                })
            } else {
                res.json({
                    status: 0,
                    message: '密码错误'
                })
            }
        } else {
            res.json({
                status: 0,
                message: "用户不存在"
            })
        }
    })

})
module.exports = router;