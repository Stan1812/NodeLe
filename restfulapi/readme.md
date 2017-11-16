### 接口文档   

>初试前后端分离
---
- 管理员登录 POST /login
```javascript
request body:
{
    username:''   //String
    passwoed:''   //String
}
```
- 获取文章列表 GET /articles
```javascript
params:
{
    page:1        //Number
}
```
- 发表文章 PUT /newarticle
```javascript
request body:
{
    date: ''      //String
    content:''     //String
    title:''      //String    
}
```
- 更新文章 POST /update
```javascript
request body:
{
    id:1          //Number
    date: ''      //String
    content:''     //String
    title:''      //String    
}
```
- 删除文章 DELETE /delart
```JavaScript
request body:
{
   id:1         //Number   
}
```
- 发表评论 PUT  /comment
```JavaScript
request body:
{
   author:''        //String
   date:''           //String
   content:''        //String
   artcleid:1         //Number  
}
```
- 删除评论 DELETE /delcom
```JavaScript
request body:
{
   artcleid:1         //Number  
}
```
//貌似就这些吧，想到再加