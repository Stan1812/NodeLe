//http://lol.qq.com/web201310/info-heos.shtml?ADTAG=lolweb.v2
//

//LOL英雄资料皮肤图片
//计划这个周末前做完给爬了^-^

const path = require('path')
const fs = require('fs')
const superagent = require('superagent')
const cheerio = require('cheerio')
const EventEmitter = require('events')
const http = require('http')

const URL = 'http://lol.qq.com/biz/hero/champion.js'
const log = console.log
const imgRoot = path.resolve(process.cwd(), 'imgs')

let task = []

class MyEmitter extends EventEmitter {}
const event = new MyEmitter()

event.on('loadItemEnd', () => {
    if (task.length) {
        loadDetail(task.shift())
    } else {
        log('')
        log(`已加载完毕`)
  
    }
})

log('start')

if (!fs.existsSync(imgRoot)) {
    fs.mkdirSync(imgRoot)
}

try {
    loadSumary()
} catch (err) {
    task = []
    loadSumary()
}

function loadSumary() {
    var options = {
        host: 'lol.qq.com',
        path: '/biz/hero/champion.js'
    };
    var callback = function (response) {
        var body = '';
        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function () {
            // 数据接收完成
            let i = body.indexOf('.')
            log(i)
            body = body.substring(i + 10, body.length - 1)
            let trans = JSON.parse(body)
            let heros = trans.data
            // log(heros)
            for (hero in heros) {
                task.push({
                    'url': `http://ossweb-img.qq.com/images/lol/img/champion/` + hero + `.png`,
                    'title': heros[hero].name + heros[hero].title,
                    'imgs': heros[hero].image
                })
            }
            log('欢迎来到召唤师峡谷')
            loadDetail(task.shift())
        });
    }
    var req = http.request(options, callback);
    req.end();
}

function loadDetail(obj) {
    let url = obj.url
    let title = obj.title
    let urls = []
    console.log(obj)
    log(`正在检查 ${title}`)
    if (fs.existsSync(path.resolve(imgRoot, title))) {
        event.emit('loadItemEnd')
        log('已存在')
        return
    }
    urls.push(url)
    log(`准备加载 ${title}`)
    save({
        title: title,
        urls: urls
    }, r => {
        log(`存储完毕 ${title}`)
        event.emit('loadItemEnd')
    })
}

function save(data, callback) {
    let title = data.title
    let urls = data.urls
    Promise.all(urls.map(e => down(e, false))).then(result => {
        var imgPath = path.resolve(imgRoot, title)
        fs.mkdirSync(path.resolve(imgPath))
        log(`开始存储图片 ${title}`)
        result.forEach((e, i) => {
            fs.writeFileSync(path.resolve(imgPath, `${title}.jpg`), e.body, null)
        })
        callback && callback()
    })
}

function down(url, hasProcess = true) {
    if (hasProcess) {
        return new Promise((resolve, reject) => {
            superagent.get(url).end((err, res) => {
                if (err) reject(err)
                resolve(res)
                log(res)
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            superagent.get(url).end((err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
}