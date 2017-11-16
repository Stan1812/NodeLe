//现在在纠结是选择哪一种方案。。。。

//现在有三种方式。。


/* 1每条评论单独存放，每条评论附有所属的文章
 *{
 *  content: {
 *        type: String
 *   },
 *  username: {
 *     type: String
 *   },
 *   articleid: {
 *       type: String
 *   }
 *}
 */

/* 2每篇文章的评论以数组形式存放
 *{
 *  article_id: 1;
 *  comments: [{ content: "fewfewfew", author: 'dfsdfd' }],
 *}
 */

/*  3每篇文章内所有内容都放到文章详情里虽然mongodb存储大量数据不是问题。。
 *   但总觉得全部放到一堆很不优雅。。。
 *  （难道是写前端拆东西拆习惯了？）
 */

/* 经过考虑，决定使用第二种解决方案，个人觉得优势在于获取文章时应该可以加快响应速度
 * 评论和文章单独获取。
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var postschema = new Schema({
    articleid: {
        type: Number
    },
    comments: [{
        content: {
            type: String
        },
        username: {
            type: String
        }
    }]
})
module.exports = mongoose.model('comment', postschema);

/* comment.update({ "articleid": 1 }, {
    $push: {
        comments: {
            content: {
                type: String
            },
            username: {
                type: String
            }
        }
    }
}, function(err, result) {
    if (err) return console.error(err);
    console.log(result);
}); */