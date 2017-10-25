var request = require("request");
var cheerio = require("cheerio");

request('https://www.baidu.com/',function(err,result){
    if(err){
        console.log("错误："+err);
        return;
    }   
    //console.log(result.body);
    var $ = cheerio.load(result.body);
    //通过 DOM 抓取网页数据
    console.log($('title').text());	
})

