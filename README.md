# vue-cli 快速安装

```
vue init webpack 项目名
```

# element-ui

- 安装

```js
npm i element-ui -S
```

- 按需加载

```js
npm install babel-plugin-component -D
```

.babelrc 修改为:

```js
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

# markdown 文件引入

文件引入需要 loader, 这里使用 markdown-loader 和 html-loader

```js
npm i markdown-loader --save
npm i html-loader --save
```

在 build/utils 文件的styleLoaders函数末尾中添加一段代码

```js
output.push({
    test: /\.md$/,
    use: [
      {
        loader: "html-loader"
      },
      {
        loader: "markdown-loader",
        options: {
          /* your options here */
        }
      }
    ]
)}
```

配置完成之后, 正常引入即可获取解析之后的 html

```js
<template>
  <div>
    <div v-html="result" />
  </div>
</template>
```

```js
<script>
  import result from '../../test.md';
  export default {
    data() {
      return {
        result
      };
    }
  };
</script>
```

# 解析 markdown 数据

将 `#标题` 解析成 `<h1>标题</h1>`, 需要引入一个新的包 marked

```js
npm i marked --save
```

```js
marked("#标题");
```

# 代码高亮

```js
npm i highlight.js --save
```

`highlight.js`的`.js`不能少

- 使用方法

```js
<script>
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";

const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};

export default {
  name:'test',
  data() {
    return {

    };
  },
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  },
  components: {
    Upload
  }
};
</script>
```
