//豆瓣
var request = require("request");
var cheerio = require("cheerio");

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'nodetest',
  password: '123456',
  database: 'nodedb'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

request('https://book.douban.com/', function (err, result) {
  if (err) {
    console.log("错误：" + err);
    return;
  }
  //console.log(result.body);
  var $ = cheerio.load(result.body);
  //通过 DOM 抓取网页数据
  var data = $('.popular-books .bd li .info', '#content')
  data.each(function (idx, element) {
    var $element = $(element)
    let name = $element.children('.title').text()
    let author = $element.children('.author').text()
    let classfy = $element.children('.book-list-classification').text()
    let reviews = $element.children('.reviews').text()
    console.log(name, author, classfy, reviews)
    // var addSql = 'INSERT INTO books(name,book_author,book_classification,book_reviews) VALUES(?,?,?,?)';
    var addSql = 'INSERT INTO books(name,author,classfy,reviews) VALUES(?,?,?,?)';

    var addSqlParams = [name, author, classfy, reviews];
    connection.query(addSql, addSqlParams, function (err, result) {
      logErrMsg(err, result)
    })
  })
})

function logErrMsg(err, result) {
  if (err) {
    console.log('ERROR:', err.message)
    return
  } else {
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
  }
}