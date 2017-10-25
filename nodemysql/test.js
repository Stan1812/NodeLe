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

// 增
var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var addSqlParams = ['家园网', 'https://team.ncuos.com', '00000', 'CN'];
connection.query(addSql, addSqlParams,function(err, result){
  logErrMsg(err, result)
})


//查
var sql_query = 'SELECT * FROM websites';
connection.query(sql_query,function(err, result){
  logErrMsg(err, result)
});

// 删
var key = 'name'
var value = '李彪'
var sql_delete = 'DELETE FROM websites WHERE ' + key + '=' + value + ''

//connection.query(sql_delete, function(err, result){
 // logErrMsg(err, result)
//})


//改
var sql_update = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var upParams = ['菜鸟移动站', 'https://m.runoob.com',6];
//connection.query(sql_update, upParams,function(err, result){
//  logErrMsg(err, result)
//})

connection.end();
