//一个图片网站的爬虫

var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');

function getUrls() {
    var urls = [],
        baseUrl = 'http://www.mmjpg.com/mm/';
    for (var i = 200; i < 210; i++) {
        var tmp = baseUrl + i;
        urls.push(tmp);
        var dir = './mei/' + i;
        //创建目录
        mkdirp(dir, function (err) {
            if (err) {
                console.log(err);
            } else console.log(dir + 'mk done!');
        });
    }
    return urls;
}
var urls = getUrls();
async.eachSeries(urls, function (url, callback) {
    fetchUrl(url, callback);
}, function (err) {
    console.log('fail in async.eachSeries');
});

// 抓取网页内容
function fetchUrl(url, callback) {
    var options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
            'Connection': 'keep-alive'
        }
    };
    console.log('getkeyin：' + options.url);
    request(options, function (error, response, body) {
        if (error) console.log(error);
        else console.log('get"key"' + options.url);
        if (!error && response.statusCode == 200) {
            acquireData(options.url, body);
            callback(null, null);
        }
    })
}

function acquireData(url, data) {
    var $ = cheerio.load(data);
    var grils = $('#content img').toArray();
    var mm = $('#page a').eq(5).text();
    console.log(mm)
    console.log(grils)
    console.log('get:' + mm + 'pics');
    var list = url.split('/');
    for (var i = 1; i < mm; i++) {
        var imgsrc = path.dirname(grils[0].attribs.src) + '/' + i + '.jpg';
        console.log(imgsrc);
        var filename = parseUrlForFileName(imgsrc); //生成文件名
        downloadImg(imgsrc, filename, './mei/' + list[4], function () {
            console.log(filename + ' done');
        });
    }
}

function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
var downloadImg = function (uri, filename, dir, callback) {
    request({
        uri: uri,
        encoding: 'binary'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!body) console.log("failed")
            fs.writeFile(dir + '/' + filename, body, 'binary', function (err) {
                if (err) {
                    console.log(err);
                }
                console.log('download' + dir + '/' + filename + ' done');
            });
        }
    });
};