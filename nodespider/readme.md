## 我的node爬虫们
##### 介绍一下我的爬虫们
---
### sscheckin.js

emm，放到服务器上跑个定时任务执行这个爬虫，每日签到

---
### LOL-spider

偶然看到了英雄联盟官网上面的关于英雄的介绍和皮肤，地址在此[](http://lol.qq.com/web201310/info-heros.shtml?ADTAG=lolweb.v2)皮肤图片是相当的好看啊，所以就想要把图片给爬下来
因为是昨天晚上看到的，也没有仔细看，以为是静态页面，想着很快就能给撸出来，但是事实上是我脑子抽了。来打开network来看一下请求，发现英雄的图片并不像一些网站一样，，直接page=1，2，3，4按顺序就给爬了。。。
而是用英雄的名字做了参数：http://lol.qq.com/web201310/info-defail.shtml?id=Aatrox
，于是开始找英雄列表的请求，但是找了半天没有找到。于是开始看源码，终于找到了这样一个JS文件：[](http://lol.qq.com/biz/hero/champion.js)。。。
果然前端又调皮了，竟然把英雄们藏在了JS文件里，那就很顺理成章了，拿到文件，拿到英雄列表。拿到了英雄们的信息，开始爬皮肤。

但是在爬皮肤的图片的时候果然页面还是由JS动态生成的，看一下请求，并没有直接拿到皮肤列表的请求，前端肯定又调皮了，，果然，看了一下代码，真的找到了这样一个文件：http://lol.qq.com/biz/hero/Aatrox.js
。相同的套路。。之前u已经拿到了英雄的名字，发个请求分别拿到各个英雄的详细信息，拿到data.skin，接下来就是顺理成章了，英雄们的所有信息都有了。皮肤也有了。

---

### test3.js

嗯，学习资料。

---

### spider1.js

第一个所谓的爬虫：拿到的是豆瓣读书里面的一个书籍的排行，静态页面，，直接就拿到了。。然后把数据存到了mysql里。

---
### spider2.js

嗯，还是学习资料。
