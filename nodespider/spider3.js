var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var async = require('async');

var url = 'http://image.so.com/i?q=%E7%8C%AB&src=tab_www';

function getlist() {
  request(url, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(body);
      var imgList = []
      JSON.parse($('script[id="initData"]').html()).list.forEach(function (item) {
        imgList.push(item.img)
      });
      console.log(imgList);
      return imgList
    }
  });
}
var List = getlist()

var downloadPic = function (src, dest) {
  request(src).pipe(fs.createWriteStream(dest)).on('close', function () {
    console.log('pic saved!')
  })
}

async.mapSeries(List, function (item, callback) {
  setTimeout(function () {
    downloadPic(item, './catpics/' + (new Date()).getTime() + '.jpg');
    callback(null, item);
  }, 400);
}, function (err, results) {if (err){
  console.log('fuck')
}});