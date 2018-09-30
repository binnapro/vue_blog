---
layout: post
title: "对vertical-align的一些认识"
subtitle: "something about vertical-align"
date: 2016-11-08
author: "Binna"
header-img:
catalog: true
tags:
    - css
    - 前端开发
---

### 说明

在文字和图片同行排版的时候，会发现img图片和文字不能对齐（图片下面有个空行）；或者把一张图片放在一个a标签里面，也会看到图片下面有个空行。尴尬尴尬……

### 解释

要理解这个问题，首先要弄明白CSS对于`display:inline-block`的`vertical-align`属性各个值的含义。它的默认值是`baseline`，但这是西文才有的概念。看下面的一张图。

<img src="https://ofw1nwn63.qnssl.com/vertical-align/abc.jpeg" width="300px">

刚开始学英文的时候都是用4线格的。上面说到的`baseline`（基线）是4线格的第三条。可以看到，出现在`baseline`下面的是p啊，q啊，g啊，y啊，这些字母的下面那个尾巴。

而`vertical-align`有另外两个常见的值`top` `bottom`，它们就是4线格的第一条线和第四条线。所以你给一个元素设置上述值就会让该元素和文字的相应位置对齐了。

可以看到，`baseline`和`bottom`之间有一定的距离。实际上，`inlin-block`的图片下面的那个空格就是正式`baseline` `bottom`之间的距离。即使只有图片没有文字，这个间距也是存在的。

另外，top和bottom之间的值即为`line-height`，假如把`line-height`设置为0，那么`baseline`和`bottom`之间的距离也变为0，img下面的空格也就消失了。如果没有设置`line-height`，`line-height`的默认是基于`font-size`的，一般是字体大小的一个比例(比如1.2)。当然也可以把字体大小设置为0，那么在没有设置行号的情况下，行高也是0，也就没有那个空行了。

### vertical-align的取值

| 值                        | 描述                                |
| :----------------------- | :-------------------------------- |
| baseline                 | 默认。元素的基线与父元素的基线对齐。                |
| sub                      | 降低元素的基线到父元素合适的下标位置                |
| super                    | 升高元素的基线到父元素合适的上标位置                |
| top                      | 把对齐的子元素的顶端与line box 顶端对齐          |
| text-top                 | 把元素顶端与父元素内容区域的顶端对齐                |
| bottom                   | 把对齐的子元素的底端与line box底端对齐           |
| text-bottom              | 把元素底端与父元素内容区域的底端对齐                |
| inherit                  | 继承父元素的vertical-align              |
| 2px \| -2px \| -2% \| 2% | 相对于基线位移，微调。其中百分数值是相对与line-height的 |

### vertical-align适用范围

只有一个元素属于inline或是inline-block，那么vertical-align才会生效。所以

```css
div{
  vertical-align:middle
}
```

是不能生效的。所谓的inline-block元素是可以和水平元素混排，但是又能设置高宽等属性的元素（比如：图片、按钮、单选、复选、单行文本框、多行文本框）。

**注意：**只有inline-block的元素才会对vertical-align起作用。虽然inline的元素也会因为因此改变位置，这是因为vertical-align导致基线位置改变，所以inline元素位置改变了。

### example

测试代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		body{
			font-size:50px;
		}
		.buhao{
			background:green;
			line-height:100px;
		}
		img{
			vertical-align:bottom;
		}
		.nihao{
			border:1px solid black;
			position:absolute;
			top:10px;
		}
	</style>
</head>
<body>
	<div class="buhao">
	<img src="https://ofsjy8rwf.qnssl.com/1.jpg" width="50px">
	<span>你好
	bpiayNPq</span>
	</div>
	<div class="nihao"></div>
</body>
</html>
```

首先水平排列一张图片和一些中文字和英文字母。可以看到图片和文字并不能对齐，图片明显高于文字。这下面的间距就是4格线的第三条线和第四条线之间的距离(baseline)。

<img src="https://ofw1nwn63.qnssl.com/vertical-align/1.png" width="350px">

给图片添加属性`vertical-align:bottom`(图片是inline-block元素)。可以看到图片和文字最下面对齐。中文有点小瑕疵。

<img src="https://ofw1nwn63.qnssl.com/vertical-align/2.png" width="350px">

同时给图片和字体添加属性`vertical-align:middle`就能让图片和中文字体对齐。

<img src="https://ofw1nwn63.qnssl.com/vertical-align/3.png" width="350px">

给图片添加属性`vertical-align:top`就能图片对齐line-box的顶端(并不是文字部分的最高处)。

<img src="https://ofw1nwn63.qnssl.com/vertical-align/4.png" width="350px">

那么`top` `text-top`以及`bottom` `text-bottom`有什么区别呢？如果你在上面的基础上直接设置这两个值，你会发现，没有任何变化，这只是运气好而已，因为我们没有设置`line-height`属性。

给文字设置行号，这里的文字大小是`50px`，设置行高`100px`，然后给图片添加`vertical-align:top`，效果如下:

<img src="https://ofw1nwn63.qnssl.com/vertical-align/5.png" width="350px">

然后修改图片属性为`vertical-align:text-top`，效果如下:

<img src="https://ofw1nwn63.qnssl.com/vertical-align/6.png" width="350px">