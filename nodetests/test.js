var http = require('http')
var fs = require('fs')
var queryString= require('querystring')
var url =require('url')
var util = require('util')
var events = require('events')
var emitter =new events.EventEmitter()

emitter.on('something',function(arg1,arg2){
    console.log('listener',arg1,arg2)
})
emitter.emit('something','test1','success')
fs.readFile('test.txt','utf-8',function(err, data){
    if(err){
        console.log('files read failed')
    } else{
        console.log(data)
    }
})

// http.createServer(function(req,res){
//     var post="";
//     console.log(util.inspect(post))
//     req.on('data',function(chunk){
//         post+=chunk 
//         console.log('post:',post)
//     })
   
//     req.on('end',function(){
//         post= queryString.parse(post)
//         res.end(util.inspect(post))
//     }
// )
// }).listen(3000)


// var contents = queryString.stringify({
//     name:'test',
//     emial:'2333@163.com'
// })
// var options = {
//     host:'www.byviod.com',
//     path:'/application/node/post.php',
//     headers:{
//         'Content-type':'application/x-www-form-urlencoded',
//         'Content-length':contents.length
//     }
// }
// var req= http.request(options,function(res){
//     res.setEncoding('utf-8')
//     res.on('data',function(data){
//         console.log(data)
//     })
// })
// req.write(contents)
// req.end();
http.createServer(function (req, res) {
    res.writeHead('200', {
        'Content-type': 'text/html'
    });
    res.write('<h1>hello node.js</h1>');
    res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000); 
console.log('http sever is lisening at 3000')
// console.log(util.inspect(http, true, true))