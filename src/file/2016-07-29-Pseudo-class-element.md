---
layout: post
title: "关于伪类元素:before和:after"
subtitle: "about Pseudo-class element :before and :after"
date: 2016-07-29 10:48:19 
author: "Binna"
header-img: 
catalog: true
tags:
    - css
    - 前端开发
---

在css3中为了区分伪类元素和伪元素，把伪类元素用双冒号标识，即`::befeore`和`::after`。但是IE8只支持单冒号的用法。

### 基本用法

`:before`和`:after`的作用就是在指定的元素内容（而不是元素本身）之前或者之后插入一个包含`content`属性指定内容的行内元素，最基本的用法如下：

```html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>example</title>
</head>
<body>
    <div id="example">Hello World!</div>
</body>
```

```css
#example:before{
    content:"#";
    color:red;
}

#example:after{
    content:"$";
    color:green;
}
```

这段代码会在`#example`元素内容之前插入一个**\#**，以及在内容之后插入一个**$**，插入的元素作为example的子元素，效果如下：

\#Hello World!$

需要注意的是如果没有content属性，伪类元素将没有任何作用。但是可以指定为空，同样如前面所说，插入的内容是一个行内元素，并且在Html源码中无法看到，这就是为什么称之为伪类元素的理由，所以也就无法通过DOM对其进行操作。

```css
#example:before{
    content:"";
    display:block;
    width:100px;
    height:100px;
}
```

伪类元素也会像其他子元素一样正常继承父元素的一些css属性，比如字体等。

除了插入文字内容，还可以指定其他内容：

```css
p:before{
    content:url('img.jpg');
}
a:after{
    content:attr(href);
}
```

`attr()`函数会返回指定元素对应属性的值。

### css绘制小三角

以下方法可以创建一个三角形

```css
.triangle{
    width: 0;
    height: 0;
    border:50px transparent solid;/*transparent表示边框颜色是透明的*/
    border-top-color: black;  /*这里我们仅将上边框的颜色设置为黑色*/
    /*border-bottom-color: black; /*这里设置底部边框色为黑色*/
    /*border-left-color: black;  /*这里设置左边边框色为黑色*/
    /*border-right-color:black; /*这里设置右边边框色为黑色*/
}
```

网页截图如下，设置的边框线可以得到不同方向的三角形：

![triangle black](https://ofw1nwn63.qnssl.com/Pseudo-class/Pseudo-class-triangle.png "triangle")

### 绘制微信QQ对话框

利用上述三角形的构成方法，加上伪类元素在一个边框前面加上一个小三角形，代码如下

```css
.test-div{
    position: relative;  /*日常相对定位*/
    width:150px;
    height:36px;
    border-radius:5px;
    border:black 1px solid;
    background: rgba(245,245,245,1)
}
.test-div:before,.test-div:after{
    content: "";  /*:before和:after必带技能，重要性为满5颗星*/
    display: block;
    position: absolute;  /*日常绝对定位*/
    top:8px;
    width: 0;
    height: 0;
    border:6px transparent solid;
}
.test-div:before{
    left:-11px;
    border-right-color: rgba(245,245,245,1);
    z-index:1
}
.test-div:after{
    left:-12px;
    border-right-color: rgba(0,0,0,1);
    z-index: 0
}
```

效果如下所示，这就是简单的一个微信QQ对话框：

![talkbox](https://ofw1nwn63.qnssl.com/Pseudo-class/Pseudo-class-Psetalkbox.png "talk-box")

### 引号的运用

在内容前后加上引号，以下截图效果是加了另外的效果。

```css
blockquote:before{
	content：open-quote;
}
blockquote:after{
  	content: clase-quote;
}
```

![content-quote](https://ofw1nwn63.qnssl.com/Pseudo-class/Pseudo-class-content-open-quote.png "content-quote")