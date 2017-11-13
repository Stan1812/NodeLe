//使用linux定时任务Crontab
//node路径：/root/.nvm/versions/node/v8.8.0/bin/node
const cheerio = require('cheerio')
const querystring = require('querystring')
const http = require('http')

const log = console.log
const URL = '47.91.149.156'

try {
    log('let\'s start login')
    login()
} catch (err) {
    log('GG,something is wrong')
}

function login() {
    let postData = querystring.stringify({
        email: '2314980309@qq.com',
        passwd: 'KG1415926535'
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
        let headers = JSON.stringify(res.headers)
        let cookie = JSON.parse(headers)['set-cookie'][0]
        let i = cookie.indexOf(';')
        cookie = cookie.substring(0, i)
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            chunk = JSON.parse(chunk)
            log(chunk)
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
        let headers = JSON.stringify(res.headers)
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            chunk = JSON.parse(chunk)
            log(chunk)
        });
        res.on('end', () => {
            log('data receiving end')
        });
    });

    chreq.on('error', (e) => {
        console.error(`请求遇到问题: ${e}`);
    });
    chreq.end();
}
