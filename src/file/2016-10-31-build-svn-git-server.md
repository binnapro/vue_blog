---
layout: post
title: "GIT及SVN服务器搭建"
subtitle: "build git and svn server"
date: 2016-10-31
catalog: true
header-img:
tags:
    - git
    - svn
    - 工具使用
---

### git服务器搭建

虽然git的初衷是为了开源，但是有些时候我们还是需要一个私密的空间。尽管github也提供了私密仓库，但是这是收费的。我们想的是在自己的服务器上搭建git服务器，尽管所有的私人电脑都可以作为一台服务器，我们还是想在有一个公共的地方放置我们的代码，以下就是git服务器的搭建教程。

#### 安装git

centos的服务器系统可以用以下命令安装：

```shell
sudo yum install git 
```

ubuntu的服务器系统可以用以下命令安装：

```shell
sudo apt-get install git
```

当然除了上述方法，linux系统都是可以通过编译源码安装的。

#### 创建git用户

创建一个git用户，用来运行git服务：

```shell
sudo adduser git
```

创建的用户当然也可以删除，这里提供一种删除用户，该方法会顺带删除该用户的文件：

```shell
sudo userdel -f git
```

创建了用户之后，在`/home`目录下会多出一个`git`的文件夹，这个文件就代表了用户，我们要在这里存公钥，往下看……

#### 创建证书登录

切换到刚创建的git用户

```shell
su - git
```

如果要切换回去的话，稍微有点不一样

```shell
su root
```

切换了用户之后，你能看到新起一行开始的root变成了git，这说明用户切换成功了。然后我们进入`/home`，在这里创建一个文件夹`.ssh`

```shell
mkdir .ssh
```

给文件夹分配权限

```shell
chmod 700 .ssh
```

在.ssh文件夹里面创建一个authorized_keys文件

```shell
touch ~/.ssh/authorized_keys
```

给文件分配权限

```shell
chmod 644 ~/.ssh/authorized_keys
```

收集所有的需要登录用户的公钥，就是每个人`id_rsa.pub`文件里面的代码，我们把自己的电脑和github关联起来的时候用的也是这个公钥，把他们复制到authorized_keys文件中，每输入一个公钥，记得换行。

```shell
vi ~/.ssh/authorized_keys #打开文件，添加公钥
```

**注意：**这里说明一下，git用户不设置密码，clone的时候也不需要密码。但是git用户设置了密码， 但是还是不想通过输入密码来clone项目，就需要设置文件权限了，原因如下：

```
sshd为了安全，对属主的目录和文件权限有所要求。如果权限不对，则ssh的免密码登陆不生效。
用户目录权限为 755 或者 700，就是不能是77x。
.ssh目录权限一般为755或者700。
rsa_id.pub 及 authorized_keys权限一般为644。
rsa_id权限必须为600。
```

所以这里设置了一下文件权限，所有步骤做完之后，你可以不用输入密码就能clone项目代码。

这里提一下本地生成key的方法，在git-bash里面跑命令`ssh-keygen -t rsa -C "youremail@example.com"`，生成的key在`C:\Users\yourname\.ssh\id_rsa.pub`文件里。

#### 初始化git仓库

先选定一个目录作为Git仓库，假定是`/srv/binna.git`，先进入`/srv`目录，在这里创建一个裸仓库，创建裸仓库的命令如下。

```shell
sudo git init --bare binna.git #输入命令可以看到binna.git文件，这是裸仓库，什么都没有
```

**注意：**有时候输入上述命令报错了，那是因为sudo的权限不够，好像是只读的原因，不能写文件。所以要么修改sudo的权限，要么用root用户操作，但是反正都是要切回root用户进行操作的，就直接用root用户操作上述命令好了。但是现在创建出来的文件是root用户的。我们想要的效果是这个文件是git用户的。往下看...

通过上述操作，Git就会创建一个裸仓库，裸仓库没有工作区，因为服务器上的Git仓库纯粹是为了共享，所以不让用户登录到服务器修改工作区，并且服务器上的Git仓库通常以`.git`结尾。上面说道创建的文件是root用户的，然后修改仓库的拥有者和群组，让他变成git用户的。

```shell
sudo chown -R git:git binna.git
```

#### 禁用shell登录。

处于安全考虑，第二步创建的git用户不允许登录shell，这可以通过编译`/etc/passed`文件完成。

```shell
vi /etc/passwd
```

找到类似下面的一行，一般是在最下面

```shell
git:x:1001:1001:,,,:/home/git:/bin/bash
```

改为

```shell
git:x:1001:1001:,,,:/home/git:/bin/git-shell
```

这样，`git`用户可以正常通过ssh使用git，但是无法登录shell，因为我们为`git`用户指定的`git-shell`每次登录就自动退出。

#### 克隆仓库

现在可以通过git clone命令克隆仓库了，在各自的电脑上运行：

```shell
git clone git@server:/srv/binna.git
```

这样就可以本地拷贝这个文件了。

**特例：**一般到这一步就没什么问题了，但是我碰到下面的一个问题

![git error](https://ofw1nwn63.qnssl.com/git-svn-server/git-error.png "git error")

这里提示说“远程host身份证明已经改变”。原因是远程的系统改变了，那么秘钥也就改变了，所以保存在本地的秘钥就失效了。能碰到这个问题的说明已经在这个服务器上进行过多次裸仓库搭建操作了，还重装了系统。。。。

解决方法，打开各自电脑的`know_hosts`，删除相应行（我的是最后一行），相应行都是有ip地址的，仔细看下。

### svn服务器搭建

> 引用自文章[Lnmp下搭建svn服务器简明步骤](http://denight.leanote.com/post/Lnmp%E4%B8%8B%E6%90%AD%E5%BB%BASvn%E6%9C%8D%E5%8A%A1%E5%99%A8)

#### 说明

下文中PROJECT、USER1、USER2、YOUR_GROUP、PASSWD1、PASSWD2等全大写字符串均为举例说明，替换成相应名字就好。

#### 安装

```shell
yum install subversion
```

#### 建立版本库文件夹，并给权限777

比如我们想在`/srv/svn`创建版本库，先进入`/srv`

```shell
cd /srv
mkdir svn
chmod 777 -R svn  # 给文件777的权限，也就是所有用户对改文件都有读写执行的权限
```

#### 创建版本库

```shell
svnadmin create svn/PROJECT # PEOJECT就是项目的名称
```

#### 配置svn

##### 配置svnserve.conf

```shell
vi svn/PROJECT/conf/svnserve.conf
```

将内容中注释掉的以下部分去掉\#和空格，并将`anon-access=read`改为`anon-access=none`。

```shell
anon-access = none
auth-access = write
password-db = passwd
authz-db = authz
```

##### 配置authz

```shell
vi svn/PROJECT/conf/authz
```

在[group]下加入

```shell
YOUR_GROUP = USER1,USER2
```

在\#[/foo/bar]下加入

```shell
[/]
@YOUR_GROUP=rw
* = r
```

##### 配置passwd

```shell
vi svn/PROJECT/conf/passwd
```

在[users]下加入

```shell
USER1=PASSWD1
USER2=PASSWD2
```

#### 启动Svn服务

```shell
svnserve -d -r svn/
```

这里需要注意，这里设置的是svn服务器的根目录。在checkout的时候，以这个目录(/srv/svn)作为起点，可以添加多个版本库，访问的时候则可以用`svn://域名/PROJECT`checkout项目。

#### 关闭服务

直接杀死相关进程即可

```shell
killall svnserve
```

#### 客户端访问方法

```shell
svn checkout svn://server/PEOJECT
```

#### 可能出现的问题

##### Centos7下客户端无法访问

这是应为Centos7下，原先的iptable被替换了firewald，所以对iptable的防火墙设置是没有用的。因此如果想要让3690端口（svn服务器端口）对外开放的话，则需要对firewald进行配置。

```shell
firewall-cmd --permanent --query-port=3690/tcp
```

通过上述命令可以查看3689端口是否开放。

```shell
irewall-cmd --permanent --add-port=3690/tcp
```

通过上述命令则可以添加开放端口。

