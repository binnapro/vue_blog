---
layout: post
title: "搭建Ghost平台的博客"
subtitle: "Build a Ghost blog"
date: 2016-10-06 09:06:49
author: "Binna"
header-img:
catalog: true
tags:
    - Ghost
    - 博客搭建
---

主机空间是在19vps上买的，绑定域名可以不用备案。域名是在新网上注册的。

### 服务器

服务器的选择比较广，一般国内的主机空间在解析域名的时候都需要备案，备案过程比较费时间。所以我先选择了香港的服务器来进行测试。

但是xshell在远程调试的时候，很慢，很慢，很慢，打算买个国内服务器。阿里云和腾讯云都有学生优惠，但是阿里云现在的学生优惠的服务器是windows系统的，不太喜欢，而腾讯云是linux系统的，所以打算使用腾讯云来学习。腾讯云是在每天中午12:00开抢的，还是比较好抢的。

### 域名

域名就比较简单了，新网万网都是可以买的。购买的域名绑定国外服务器不需要备案，但是用国内的服务器就需要备案了。购买了域名之后需要解析域名，一般在购买域名的网站就可以找到域名解析的网页，原理就是把你的域名和你的主机空间的IP地址连接起来。我买的新网的域名，用的也是新网的域名解析，注意，域名在购买的时候有个模版，你可以选择快速慢板，但是最好一开始就写好模版，之后再写很麻烦，没有写好模版是会出问题的，毕竟没有你的信息，不能证明这是你的域名嘛。

### 工具

连接控制主机空间的软件叫做Xshell

给远程空间上传文件的软件叫做Xftp

### 安装LNMP

我使用了LNMP(Linux+nginx+mysql+phpmyadmin)一键搭载网站环境。nginx是一个服务器软件，他和apache是类型的作用。如果只是用来显示没有使用数据库的前端网页，只需要安装服务器软件就可以了，首先打开xshell终端，新建会话，在名称的地方为自己的这个会话窗口取个名字，主机的输入框输入ip地址，协议用看你用的连接了，一般默认ssh。

![xshell-step1](https://ofw1nwn63.qnssl.com/build-ghost/xshell-step1.png)

然后点击用户身份验证，输入用户名和密码，用户名和密码是在购买主机空间的时候得到的。

![xshell-setp2](https://ofw1nwn63.qnssl.com/build-ghost/xshell-setp2.png)

输入完点击确定，就会得到下面的界面，然后点击，连接就可以了。

![xshell-setp3](https://ofw1nwn63.qnssl.com/build-ghost/xshell-step3.png)

连接成功会有如下界面。

![xshell-setp4](https://ofw1nwn63.qnssl.com/build-ghost/xshell-ste4.png)

接下来就是下载LNMP安装包，在\#后面输入下面的内容

```shell
wget -c http://soft.vpser.net/lnmp/lnmp1.2.tar.gz     #下载1.2版本的lnmp
tar zxvf lnmp1.2.tar.gz     #解压
cd lnmp1.2    #进入解压后的lnmp目录
./install.sh    #开始进行安装操作
```

```shell
+------------------------------------------------------------------------+
|          LNMP V1.2 for Ubuntu Linux Server, Written by Licess          |
+------------------------------------------------------------------------+
|        A tool to auto-compile & install LNMP/LNMPA/LAMP on Linux       |
+------------------------------------------------------------------------+
|          For more information please visit http://www.lnmp.org ;        |
+------------------------------------------------------------------------+
Please setup root password of MySQL.(Default password: root)
Please enter: root #为你的mysql创建root密码
MySQL root password: root
===========================
Do you want to enable or disable the InnoDB Storage Engine?
Default enable,Enter your choice [Y/n]: n #是否安装InnoDB
You will disable the InnoDB Storage Engine!
===========================
You have 5 options for your DataBase install.
1: Install MySQL 5.1.73
2: Install MySQL 5.5.42 (Default)
3: Install MySQL 5.6.23
4: Install MariaDB 5.5.42
5: Install MariaDB 10.0.17
Enter your choice (1, 2, 3, 4 or 5): 3 #选择mysql版本
You will Install MySQL 5.6.23
===========================
You have 5 options for your PHP install.
1: Install PHP 5.2.17
2: Install PHP 5.3.29
3: Install PHP 5.4.41 (Default)
4: Install PHP 5.5.25
5: Install PHP 5.6.9
Enter your choice (1, 2, 3, 4 or 5): 5 #选择php版本
You will install PHP 5.6.9
===========================
You have 3 options for your Memory Allocator install.
1: Don't install Memory Allocator. (Default)
2: Install Jemalloc
3: Install TCMalloc
Enter your choice (1, 2 or 3): 1 
You will install not install Memory Allocator.    #按任意键，设置完成，正式进入安装，预计20-40分钟完成
```

这样LNMP就安装好了，然后就是进行一些设置，输入lnmp vhost add进行设置，该设置的目的是在/usr/local/nginx/vhost下面创建一个简易的conf文件。当然可以手工创建这个文件。

```shell
lnmp vhost add 
+-------------------------------------------+
|    Manager for LNMP, Written by Licess    |
+-------------------------------------------+
Please enter domain(example: www.lnmp.org): root #输入绑定的主域名
======================================
Your domain: root
======================================
Do you want to add more domain name? (y/n) y #是否绑定其它域名
Enter domain name(example: lnmp.org *.lnmp.org): www.yuming.com #输入其它域名
domain list: www.yuming.com
Please enter the directory for the domain: yuming.com
(Default directory: /home/wwwroot/yuming.com): #默认创建的网站文件所在目录
Virtual Host Directory: /home/wwwroot/yuming.com
===========================
Allow Rewrite rule? (y/n)
===========================
y #是否添加伪静态文件
Please enter the rewrite of programme:
wordpress,discuz,typecho,sablog,dabr rewrite was exist.
(Default rewrite: other):typecho 
===========================
You choose rewrite=typecho
===========================
===========================
Allow access_log? (y/n)
===========================
n #是否启用日志文件
======================================================
Create database and MySQL user with same name (y/n)
======================================================
y #是否创建mysql数据库
verify your current MySQL root password: **** #输入安装时的mysql数据库root密码
Warning: Using a password on the command line interface can be insecure.
MySQL root password correct.
Enter database name: database #创建数据库用户名
Your will create a database and MySQL user with same name: database
Please enter password for mysql user vpsmm_user: passwd
Your password: passwd #创建相应密码

Press any key to start create virtul host...

Create Virtul Host directory......
set permissions of Virtual Host directory......
You select the exist rewrite rule:/usr/local/nginx/conf/typecho.conf
Gracefully shutting down php-fpm . done
Starting php-fpm  done
Test Nginx configure file......
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful

Restart Nginx......
Warning: Using a password on the command line interface can be insecure.
Warning: Using a password on the command line interface can be insecure.
User vpsmm_user create Sucessfully.
Warning: Using a password on the command line interface can be insecure.
Warning: Using a password on the command line interface can be insecure.
Warning: Using a password on the command line interface can be insecure.
Database: vpsmm_user create Sucessfully.
Warning: Using a password on the command line interface can be insecure.
Warning: Using a password on the command line interface can be insecure.
GRANT ALL PRIVILEGES ON vpsmm_user Sucessfully.
Warning: Using a password on the command line interface can be insecure.
FLUSH PRIVILEGES Sucessfully.
================================================
Virtualhost infomation:
Your domain: vpsmm.com
Home Directory: /home/wwwroot/vpsmm.com
Rewrite: typecho
Enable log: no
Database username: vpsmm_user
Database userpassword: vpsmmpasswd
Database Name: vpsmm_user
Create ftp account: no
================================================
```

至此我们可以把自己写的页面放在`/home/wwwroot/www.yuming.com`文件夹内，输入网址就可以看到自己的网页界面。

这里使用的端口是80端口，然后我们要安装的ghost是在2368端口上运行的。

### ghost博客安装

#### step1 安装nodejs

ghost是依托于nodejs的，所以需要先搭建node环境。

同样是下载解压安装。

```shell
wget http://nodejs.org/dist/v0.10.40/node-v0.10.40.tar.gz  
tar zxvf node-v0.10.40.tar.gz  
cd node-v0.10.40  
./configure 
make && make install 
```

命令执行完毕之后，检测以下环境是否配置成功。

```shell
node -v
v0.10.40
```

npm和nodejs一起安装在你的主机上了，同样查看npm的版本。

```shell
npm -v
1.4.28
```

这里需要**注意**，一定要更新npm的版本，否则安装ghost依赖包的时候会报错。更新方法如下

```shell
npm update -g npm
```

#### setp2 配置ghost

首先新建一个工作空间来存放Ghost

```shell
mkdir -p /var/www
```

下载Ghost并解压

```shell
wget http://dl.ghostchina.com/Ghost-0.7.4-zh-full.zip  
unzip Ghost-0.7.4-zh-full.zip -d ghost  
cd ghost
```
以下命令都在ghost文件下面下运行，可以输入`pwd`查看当前路径。接着修改默认配置

```shell
cp config.example.js config.js  #复制config.example.js 并命名为config.js
vi config.js   #vi即vim，用vim打开这个配置文件，进行配置
```

Ghost有产品模式、开发模式、和测试模式，我们使用production模式。修改\#注释部分（现在我们进入vi环境，想要修改这个文件，按i，左下角会出现`-INSERT`表示可以修改这个文件。修改完成之后，按esc，然后左下角的`-INSERT`会消失，输入:wq!，保存退出）

```shell
config = {
	// ### Production
	// When running Ghost in the wild, use the production environment
	// Configure your URL and mail settings here
	production: {
		url: 'http://www.yuming.win', #将''内改成你自己的域名，带上http
		mail: {},
		database: {
			client: 'sqlite3',
			connection: {
				filename: path.join(__dirname, '/content/data/ghost.db')
			},
			debug: false
		},
// 配置MySQL 数据库
    /*database: {
        client: 'mysql',
        connection: {
            host     : 'host',
            user     : 'user',
            password : 'password',
            database : 'database',
            charset  : 'utf8'
        },
        debug: false
    },*/
    server: {
    // Host to be passed to node's `net.Server#listen()`
        host: '0.0.0.0',  #将127.0.0.1改成0.0.0.0，前者表示本机，也就在本地用用，联网最好别用。后者标识本机全部的ip地址，会自动适配的
    // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
        port: '2368'
    },
}
```

现在就已经配置好了，到这里，我们还不能运行ghost，因为我们的ghost并不是完整的，我们只是下载了ghost的部分，还有一些文件需要安装，输入以下代码安装ghost的依赖包

```shell
npm install --production
```

安装完了之后，我们可以运行ghost了，使用production模式运行ghost，输入以下代码

```shell
npm start --production
```

此时ghost运行在2368端口。

![ghost](https://ofw1nwn63.qnssl.com/build-ghost/ghost.png)

在浏览器输入`域名:2368`可以看到自己的ghost。但是上图提醒我们按ctrl+c关闭ghost，所以当我们按ctrl+c或者关闭终端的时候，ghost就会关闭，我们不可能一直开着xshell，怎么让ghost保持运行有很多方法，比如screen再开个线程，forever，pm2等。我们这里使用pm2。pm2是需要安装的。使用npm全局安装

```shell
npm install pm2 -g
```

以下整理了pm2的使用方法

```
安装：npm install -g pm2
启动程序：pm2 start <app_name|id|all>
可以指定应用名称 pm2 start app,js --name=test

列举进程：pm2 list
退出程序：pm2 stop <app_name|id|all>
重起应用：pm2 restart
程序信息：pm2 describe id|all
监控：pm2 monit
实时集中log处理: pm2 logs
API:pm2 web (端口：9615 )
```

我们使用下面的命令指定工厂模式，指定程序入口。最后给pm2进程取名为ghost

```shell
NODE_ENV=production pm2 start index.js --name "ghost"
```

通过pm2 list可以看到自己的进程

![pm2](https://ofw1nwn63.qnssl.com/build-ghost/pm2.png)

这说明pm2正在运行ghost，我们关掉终端也能打开博客了。

接下来让pm2知道在开机的时候运行我们的网站

```shell
pm2 startup upstart #这是ubuntu下面的命令，arch: pm2 startup systemctl;cenos:pm2 startup centos
pm2 save
```

至此，pm2就可以一直保持ghost运行了。

我们在浏览器输入 域名:2368 可以看到ghost的主页，输入 域名:2368/ghost 进入ghost后台，第一次进入后台输入的是管理员帐号密码。当我们设置了反向代理之后，可以通过 域名 进入主页，域名/ghost 进入后台。

![website](https://ofw1nwn63.qnssl.com/build-ghost/website.png)

### nginx反向代理

通过上面的方法我们已经可以在浏览器输入`域名:2368`打开博客，但是大家还是想要在通过在浏览器输入`域名`直接打开自己的博客，这就需要设置nginx的反向代理，也就是把80端口映射到2368端口。

进入nginx配置文件。路径如下`/usr/local/nginx/conf/vhost/`。在这个目录下创建一个Nginx代理的配置文件，并将代理执行本地的Ghost端口

```shell
touch ghost.conf #创建新的配置文件，命名为ghost.conf
vi ghost.conf #打开这个新文件
```

将如下内容拷贝到新文件中：

```shell
server {
  listen 80;
  server_name yuming.com www.yuming.com; #你的域名
  location / {
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   Host      $http_host;
    proxy_pass         http://127.0.0.1:2368;
  }
}
```

编辑完成，按下esc，输入:wq!回车保存退出。

重启nginx服务器，让配置生效：

```shell
service nginx restart
```

ghost主题模版

模版文件在content/themem目录，上传模版文件到这个目录。然后使用pm2 restart ghost重启ghost。

### 80端口的开启

通过上面的方法我们使用域名只能访问ghost博客了，自己写的小网页不能查看了。其实还是可以看的。只是这个域名现在绑定在了ghsot博客而已，我们可以通过修改端口号来查看，但是我们还是不想添加端口号，每次输入麻烦。所以再绑定一个域名上去。

```shell
lnmp vhost add
```

可以再创建一个nginx配置文件，在这个配置文件里面已经指明了端口（80）和根目录位置。把文件存放在这个目录里面。在浏览器输入新的域名就可以访问了。