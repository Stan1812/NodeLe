//使用linux定时任务Crontab
//* */23 * * * /root/.nvm/versions/node/v8.8.0/bin/node /home/nodetest/NodeLe/nodespider/sscheckin.js
const cheerio = require('cheerio')
const querystring = require('querystring')
const http = require('http')
const fs = require('fs')
const log = console.log
const URL = '47.91.149.156'

try {
    // addlog('test',true)
    log('let\'s start login')
    login()
} catch (err) {
    log('GG,something is wrong')
}

function addlog(val, date) {
    if (date === true) {
        val = new Date().toString() + ':\t' + val
    } else {
        val = val + '\n'
    }
    fs.appendFile('sscheckin.log', val, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("日志已记录");
    });
}

function login() {
    let postData = querystring.stringify({
        email: 'XXXXXXXXXX',
        passwd: 'XXXXXXX'
    })
    let options = {
        host: URL,
        path: '/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    let req = http.request(options, (res) => {
        log(`status: ${res.statusCode}`)
        // log(`响应头: ${JSON.stringify(res.headers)}`);
        // addlog(JSON.stringify(res.headers),true)
        let headers = JSON.stringify(res.headers)
        let cookie = JSON.parse(headers)['set-cookie'][0]
        let i = cookie.indexOf(';')
        cookie = cookie.substring(0, i)
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            chunk = JSON.parse(chunk)
            log(chunk)
            addlog(JSON.stringify(chunk), true)
        });
        res.on('end', () => {
            log('Login success, ready to checkin')
            checkin(cookie)
        });
    });

    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e}`);
    });
    req.write(postData);
    req.end();
}

function checkin(cookie) {
    let checkinOptions = {
        host: URL,
        path: '/user/checkin',
        method: 'POST',
        headers: {
            Cookie: cookie
        }
    }
    let chreq = http.request(checkinOptions, (res) => {
        log(`status: ${res.statusCode}`)
        // log(`响应头: ${JSON.stringify(res.headers)}`);
        // addlog(JSON.stringify(res.headers),false)
        let headers = JSON.stringify(res.headers)
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            chunk = JSON.parse(chunk)
            log(chunk)
            addlog(JSON.stringify(chunk), false)
        });
        res.on('end', () => {
            log('data receiving end')
        });
    });

    chreq.on('error', (e) => {
        console.error(`请求遇到问题: ${e}`);
        addlog(e, true)
    });
    chreq.end();
}
