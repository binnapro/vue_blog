---
layout: post
title: "JS生成不重复随机数的方法"
subtitle: "js generates a unique random number"
date: 2016-07-09 18:20:22
author: "Binna"
header-img: "img/post-bg-js-version.jpg"
catalog: true
tags:
    - js
    - 前端开发
---

### 说明

我们可以`Math.random()`的方法轻松的生成一个随机的数字，但是这个梳子可能是重复的。有时候，我们需要一个不重复的随机数，可以用很多的方法来实现这个要求，以下方法的效率是比较高的。

### 解释

不重复的随机数往往是规定范围的，我们先声明一个在这个范围之内的数组，然后用`sort()`方法来排序数组，而排序的方法是用一个随机数，由于随机数的不确定性，得到一个不重复随机数组。

### 代码

```js
 var count = 10;
 //原始数组
 var original = new Array; 
 //给原始数组original赋值
 for (var i = 0; i < count; i++) {
 original[i] = i + 1;
 }
 var d1 = new Date().getTime();
 //排序
 original.sort(function() {
 return 0.5 - Math.random();
 });
 //输出
 for (var i = 0; i < count; i++) {
 document.write(original[i] + " , ");
 }
 var d2 = new Date().getTime();
 document.write("<br />运算耗时" + (d2 - d1));
```

