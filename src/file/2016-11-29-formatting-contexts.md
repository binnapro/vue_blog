---
layout: post
title: '格式上下文'
subtitle: 'Formatting Contexts'
date: 2016-11-29
author: 'Binna'
catalog: true
header-img:
tags:
    - 前端开发
    - css
---

一直用`overflow:hidden`来清除浮动，但是一直不知道为什么可以使用它来清楚浮动的影响，查了一下资料，发现是BFC的原因。那么什么是BFC呢？BFC直译过来就是”块级格式上下文“，BFC元素的一个特性就是：计算BFC高度的时，浮动元素也参与计算。而给元素添加属性`overflow:hidden`就能定义一个BFC元素。

除了BFC这个高大上的术语，还有IFC、GFC、FFC。其实网页布局分为定位、浮动、流式布局，而流式布局中有一些规则，就是IFC、GFC它们了，他们规定了box（盒式模型）的排版规则。BFC和IFC出现在CSS2.1中，CSS3中出现了FFC和GFC。

### 盒子模型

先从盒子模型开始总结，盒子模型是CSS基础中的基础，将盒子放到了合适的位置，盒子里面的内容（文字，图片等）也就放到了合适的位置。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/boxModel.jpg" width="400px"/>

可以将盒子模型看成是一层层的，上面的层覆盖下面的层。盒子模型从上到下依次是content（内容）、padding（内边距）、border（边框）、background-img（背景图片）、background-color（背景颜色）、margin（外边距）。content是我们需要展示的内容，比如图片啊文字啊什么的；margin和padding都是间距，用来撑开容器，在没有背景图片和背景颜色的情况下，给盒子设置margin或者padding都能使相邻盒子之间保持一定的距离，但是在设置了背景了之后，仅设置padding后，相邻盒子是紧接着的。这就是margin和padding之间的区别，margin是同级盒子之间的距离，padding盒子内部一个不显示内容的距离，可以使content（内容）不从背景图片的左上角开始显示。

刚开始看盒子模型的时候，一般计算盒子模型的都有一个公式：

```
width = border-width + padding-width + content-width;
```

但是也会看到下面这种形式：

```
width = content-width;
```

实际使用中发现下面这种形式比较适用，但是试着改别人的代码的时候又会出现上面的情况，查阅资料发现，这是盒子模型的两种状态。在IE5.5（怪异模式）中是使用上面这种形式的，现代浏览器都是使用标准盒子模型的，但是有些浏览器也有可能使用这种怪异模式。为了解决这个问题，CSS添加了一个属性`box-sizing`，这个属性可以让我们自由选择使用哪种形式的盒子模型。

```css
-moz-box-sizing: border-box;     // FireFox3.5+
-o-box-sizing: border-box;       // Opera9.6(Presto内核)
-webkit-box-sizing: border-box;  // Safari3.2+
-ms-box-sizing: border-box;      // IE8
box-sizing: border-box;          // IE9+,Chrome10.0+,Safari5.1+,Opera10.6

//border-box采用IE盒子模型 
//content-box采用标准盒子模型
```

### BFC

BFC（Block Formatting Context），也就是块级格式上下文。这就是一个规则的名字，我们将一个盒子设置以下属性之后，这个盒子就是一个BFC盒子：

1. Float的值不为none
2. overflow的值不为visible
3. display的值为table-cell，table-caption，inline-block中的任何一个
4. position的值不为relative和static

一个BFC盒子就要遵守BFC盒子的规则：

1. 内部的Box会垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
3. 每个元素的margin box的左边，与包含块border box左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响外面的元素。反之也如此。
6. 计算BFC高度时，浮动元素也参与计算。

接下来看一下BFC的这些规则：

#### 内部盒子垂直放置

```css
.div{
  background:#a1d664;
}
.div1{
  width:50px;
  height:50px;
  background:green;
}
.div2{
  width:50px;
  height:50px;
  background:#FF9800;
}
```

```html
<div class="div">
  <div class="div1">div1</div>
  <div class="div2">div2</div>
</div>
```

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-1.png"/>

#### 元素的margin-box的左边与包含块border-box的左边相接触

代码类似，给内部元素设置`margin-left:50px`，给包含块设置`border-left:50px`

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-2.png"/>

#### BFC区域不会和float-box重叠

其实很好理解，设置了浮动之后，这个box就是个BFC元素，BFC元素对外是独立的，所以也就不会其他BFC盒子有关系了（不重叠）。给div1的盒子设置浮动，使div2的盒子变成BFC元素。

```css
.div{
  background:#a1d664;
}
.div1{
  width:50px;
  height:50px;
  background:green;
  float:left;
}
.div2{
  width:50px;
  height:50px;
  margin:30px 0;
  overflow:hidden;
}
```

```html
<div class="div">
  <div class="div1">div1</div>
  <div class="div2">div2</div>
</div>
```

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-3.png"/>

#### 浮动元素参与BFC盒子高度计算

在不知道BFC之前，我一直是用`overflow:hidden`或者`clear:both`来清楚浮动的，一直以为是为浮动元素特别规定的方法，使用BFC是控制浮动元素高度的一种方法。

####  margin collapsing

margin重叠，在布局中表现为两个相邻盒子（可能是兄弟，也可能是祖先关系）的外边距结合为一个，这种现象有个名字，叫做折叠。

1. 折叠结果的计算方法

    * 如果相邻的两个外边距是正数，取它们中较大的值
    * 如果相邻的两个外边距是负数，取两者绝对值的较大值
    * 如果相邻的两个外边距是一正一反，取两个的和
2. 折叠产生的条件
    * 必须处于标准文档流的排版中（非浮动和非定位）的块级盒子中，长生折叠的对象处于同一个BFC中。
    * 两个产生折叠的对象之间没有空隙（clear:both），没有行级盒子，没有padding或者border。
    * 文档上说是次排列方向上，那一般就是垂直方向才会出现塌方的现象。
    * 元素的margin-top与其第一个子元素的margin-top；如果height:auto，那么最后一个子元素的margin-bottom也会和该元素的margin-bottom发生折叠。
    * 元素的margin-bottom与其相邻的同级元素的margin-top。
    * 块级自身发生collapsing，即元素本身padding和height为0，该元素自身的margin-top和margin-bottom会发生塌方。
3. 避免折叠的方法
    * 为某元素设置BFC，那么能够使它不与第一个（或者最后一个子元素）的margin 发生塌方。
    * 浮动元素不与任何元素发生折叠。
    * 绝对定位不与任何元素发生折叠。
    * inline-block不与任何元素元素发生折叠。
    * 某个元素的margin-bottom和它的下一个相邻元素的margin-top发生折叠，如果情况允许，也可以使用浮动、定位、设置inline-block来避免塌方。


先来解释一下浮动、绝对定位、inline-block不与任何元素发生折叠的原因：由于浮动元素和绝对定位元素会脱离标准文档流，而BFC是标准文档流的一个排版规则，所以也就不会发生折叠了；而inline-block是个行级块，是个特殊的东西，有点不满足块级元素，虽然能设置高宽，但是还是有行级元素的特性的，所以就不会和相邻元素折叠了。

**注意：**有个概念的理解，首先BFC是标准文档流的布局规则，其次浮动和绝对定位的元素会脱离标准文档流（也就是说浮动和绝对定位的元素不满足建立BFC的大前提：标准文档流），但是建立BFC的方法中有提到浮动和绝对定位 => 我的理解是浮动和绝对定位的元素另起炉灶，自身内部布局规则是BFC。

举个栗子：

```css
body{
  background:#00c0ff;
}
.div{
  background:#a1d664;
}
.div1{
  width:50px;
  height:50px;
  margin:30px 0;
  background:green;
}
.div2{
  width:50px;
  height:50px;
  margin:30px 0;
  background:#FF9800;
}
```

```html
<div class="div">
  <div class="div1">div1</div>
  <div class="div2">div2</div>
</div>
```

这是一个既有父元素和子元素折叠，又有子元素之间折叠的情况！body的背景色是天蓝色，最外面的盒子是浅绿色的，div1和div2都设置了margin-top和margin-bottom，结果两者之间只显示了一个，div1和div2也紧贴着父元素。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-4.png"/>

为父元素添加padding，或者添加border，或者添加BFC能使子元素不紧贴着父元素，添加之后依次如下。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-5.png" />

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-6.png"/>

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-8.png"/>

如果不想让div1和div2之间的margin折叠，可以做以下的一些操作：

给div1或者div2设置inline-block（如果条件允许的话）

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-9.png"/>

理论上给div1和div2设置float（浮动）之后都是可以达到效果的，但是给div1设置了浮动之后，它就脱离了标准文档流，那么div2也就上移占据了div1的位置；所以可以给div2设置float:left（下面的截图中，由于没有给父元素设置overflow:hidden ，所以副元素的背景色只是包裹住了div1，但是可以看到div1和div2之间的margin没有折叠了）。类似的，position:absolute也能使div2脱离标准文档流，也能达到效果。但是这样的操作真是大动干戈，还是设置单个margin吧。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-10.png"/>



### clear:both

由于BFC的盒子高度的计算会包含浮动的子元素，所以可以给浮动的父元素设置overflow:hidden;但是清楚浮动元素影响还有一种方法clear:both;

当浮动元素之后的元素设置clear以闭合相关方向的浮动时，该元素会在其margin-top以上产生一定的间隙（clearance），这个间隙能够撑开空间，达到清除浮动的效果（浮动元素不和下一个元素重叠）。

```css
.div{
  background:#a1d664;
  margin:10px;
}
.div1{
  width:50px;
  height:50px;
  background:green;
  margin-bottom:15px;
  float:left;
}
.div2{
  width:50px;
  height:50px;
  margin-top:30px;
  background:#FF9800;
  clear:both;
}
body{
  background:#00c0ff;
}
*{
  padding:0px;
  margin:0px;
}
```

```html
<div class="div">
  <div class="div1">div1</div>
  <div class="div2">div2</div>
</div>
```

给div1设置浮动，给div2设置clear:both，然后div1的margin-bottom:15px;div2的margin-top:30px;然后效果如下：

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/BFC-11.png"/>

div1和div2之间的空隙很小，是15px的大小，所以div2撑开的空隙的理解需要一个公式：

```
clearance + div2-margin-top = div1-margin-top + div1-margin-bottom + div1-height
```

使用clear:both清楚浮动的方法，由于ie6/7很淘气，所以可以使用zoom:1来清除浮动，一种兼容的写法就是

```css
.clearfix:after{
  //通过伪类创造间隙，清除浮动
  content:'';
  dispaly:block;
  height:0;
  visibility:hidden;
  cleart:both;
}
.clearfix{
  //解决ie6,ie7下不能使用after的问题
  zoom:1;
}
```

上述方法是给浮动元素的父元素添加clearfix属性，但是现代浏览器可以不用这么麻烦。

```css
.clearit{
  clear:both;
  height:0;
  font-size:0;
  overflow:hidden;
}
```

上述方法是在浮动元素下面添加一个空的div，然后给div添加clearit的class名。

### IFC

IFC（Inline Formatting Context）行级格式上下文，这东西贼伤，不能用width和height来设置高度，行级盒子有个重要的概念线框（line-box），line-box是个看不见、摸不着的东西，每一行的垂直高度由line-box的高度决定，line-box的高度一般是有line-height来确定的（也有例外，比如inline-block的情况）。但是线框里面还有个内容，就是文字，文字也有个高度的，这是由font-size确定，但是这个高度还和字体和浏览器有点关系。这里如果线框的高度比字体的高度小了，字体并不会变小，因为字体定了一个高度啊，那么如果多行字体排列就会出现挤在一起的情况。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-1.png"/>

#### 字体高度

先来总结字体高度，我们给字体设置一个高度，比如font-size:30px;

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-2.png"/>

结果发现实际高度是35px;上面说过，这是字体和浏览器（这里使用的是宋体和火狐浏览器）的原因。稍微测试了以下。

| 原字体大小30px | 宋体                   | 微软雅黑                |
| --------- | -------------------- | ------------------- |
| 火狐浏览器     | ceil(30*1.06) = 32px | ceil(30*1.3) = 40px |
| 谷歌浏览器     | 30*1 = 30px          | ceil(30*1.3) = 40px |

一般line-height只要比font-size大就能是字体不重叠，但是如果给字体设置了背景色，背景图片什么的，line-height的高度还是要更大的。

#### inline-level-box  line-box

还有行级元素是可以设置margin和padding的，只是垂直方向上是没有变化的(左右还是有空隙的)，因为它的高度是有line-height来决定的嘛，虽然没有变化，但是margin和padding还是存在的。打开浏览器控制台可查看。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-3.png"/>

1. 行级盒子

   `display:inline | inline-block | inline-table | table-cell |table-column-group`的元素对应的是inline-level-box（行级盒子）。行级盒子中有line-box（线盒）

2. line-box的特点

   * 同一行inline-level-box 均属于同一个line box。
   * 对于替换元素，inline-block元素、inline-table元素等，可以直接设置height的。
   * 对于inline元素，高度由line-height计算。
   * line-box的宽度在默认情况下是从左边框接触处到右边框与containing block右边框接触处。若存在float的兄弟盒子，则inline box的宽度为containing block的宽度减去floated-box的outer-box宽度。


根据line-box的第三条，举个栗子：

```css
.div{
  background:#a1d664;
}
.div1{
  width:50px;
  height:50px;
  background:green;
  float:left;
}
.div2{
  margin-top:30px;
}
```

```html
<div class="div">
  <div class="div1"></div>
  <div class="div2">你们好你的房间啊开绿等飞机啊独守空房杰拉德说东方凡达发的说法都是发达省份卡</div>
</div>
```

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/1.png"/>

可以看到有浮动元素的地方的宽度被减少了，没有浮动元素的地方的宽度还是不变（从头开始排列）。这是我们给div2设置overflow:hidden;

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-4.png"/>

这是BFC的知识，上面已经说过，通过overflow:hidden;给div2创建了BFC，由于div1浮动了，所以它也是BFC，两个BFC盒子之间是独立，没有关系的。

#### 行级盒子换行

再来看一个情况，下图中，使用的代码和上面是一样的，但是是一连串不间断的字母，CSS认为这是一个单词，就死活也不换行了。剩余空间不够显示一个单词，默认又是不能在单词中间直接换行的，只能另起一行显示。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/2.png"/>

但是如果再长下去，还是不会换行的，就会看不到如下结果，直接超出。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-5.png" />

给div2加一个属性word-break:break-all;字母串就能在任意地方换行了。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-6.png"/>

如果给div2加的属性是word-warp:break-word;效果如下。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-8.png"/>

但是一般怎么会有人这么乱输这么一连串没有意义的东西呢！很长的英文单词另说，所以正常的英文输入是没有问题的，默认情况下是以单词换行的。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/IFC-7.png"/>

中文和英文的换行还是有点区别的，CSS也是有属性的：

```
white-space
	normal:            忽略/合并空白
	pre:               保留空白，如同<pre>的行为
	nowrap:            忽略/合并空白，文本不会换行，直到遇到<br/>
	pre-wrap:          保留空白，但是会正常地进行换行
	pre-line:          忽略/合并空白，但是会正常地进行换行
	inherit:           从父元素继承。
word-wrap
	normal:            只在允许的断字点换行
	break-word:        在长单词或URL地址内部进行换行
word-break
	normal:            依照亚洲和非亚洲语言的文本规则，允许在单词内换行。
	keep-all:          让亚洲语言文本如同非亚洲语言文本那样不允许在任意单词内换行。
	break-all:         允许非亚洲语言文本行如同亚洲语言文本那样可以在任意单词内换行。
```

### FFC

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container），之前总结过弹性盒子了，也写过一篇博客。但是这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是没问题的。

### GFC

GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候。这和FFC差不多，反正就是一个规则，但是兼容性一把， 为了兼容，要写很多东西，感觉很麻烦，老老实实用现有的也是可以解决。不过GFC厉害还是厉害的，能像放东西一样一块快放上去。

<img src="https://ofw1nwn63.qnssl.com/Formatting-contenxts/GFC-1.png" />