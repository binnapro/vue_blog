<template>
  <div>
    <Button @click="submit" type="primary" size="small">上传</Button>
    <input type="file" @change="handleUpload" />
    <div v-if="markdown.length > 0">
      <Info title="标题" v-model="title" />
      <Info title="副标题" v-model="subtitle" />
      <Info title="时间" v-model="date" />
      <Info title="作者" v-model="author" />
      <Tag :tags="mdTag" @change="tagChange" @add="tagAdd" />
      <Editor :value="markdown" ref="editor" />
    </div>
  </div>
</template>

<script>
import { Button, Input } from "element-ui";
import { Base64 } from "js-base64";
import marked from "marked";
import Editor from "../editor/app";
import Info from "./info";
import Tag from "./tag";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";
import { post } from "../../../util/request.js";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
export default {
  data() {
    return {
      title: "",
      subtitle: "",
      date: "",
      author: "",
      mdTag: [],
      markdown: ""
    };
  },
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  },
  methods: {
    tagChange(e) {
      this.mdTag.splice(e, 1);
    },
    tagAdd(e) {
      this.mdTag.push(e);
    },
    handleUpload(e) {
      let file = e.target.files[0];
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(e) {
          var mdSource = Base64.decode(e.target.result.split(",")[1]);
          console.log(mdSource)
          var mdTitle = mdSource.split("---")[1];
          var info = this.getInfo(mdTitle);
          this.mdTag = this.getTag(mdTitle); //标签
          this.title = info.title; //标题
          this.subTitle = info.subtitle; //副标题
          this.date = info.date; //日期
          this.author = info.author; //作者
          this.markdown = marked(mdSource).split('<hr>')[2]; //文章内容
        }.bind(this);
      }
    },
    getInfo(source) {
      var result = {};
      var obj = source.replace(/[\r\n]/g, "!@#");
      obj = obj.split("!@#");
      for (var i in obj) {
        var key, value;
        if (obj[i].includes(":")) {
          key = obj[i].slice(0, obj[i].indexOf(":"));
          value = obj[i]
            .slice(obj[i].indexOf(":") + 1)
            .trim()
            .replace(/\"/g, "");
          result[key] = value;
        }
      }
      return result;
    },
    getTag(source) {
      var tag = [];
      if (!source) return tag;
      if (source.split("- ") === 1) return tag;
      tag = source.split("- ");
      tag.shift();
      tag.map(
        (e, i) => (tag[i] = e.replace(/\ +/g, "").replace(/[\r\n]/g, ""))
      );
      return tag;
    },
    submit() {
      this.$refs.editor.getValue();
      const { author, date, markdown, mdTag, subtitle, title } = this;
      post("upload", {
        author,
        date,
        markdown,
        mdTag,
        subtitle,
        title
      });
    }
  },
  components: {
    Editor,
    Button,
    Input,
    Info,
    Tag
  }
};
</script>

<style scoped>
</style>
