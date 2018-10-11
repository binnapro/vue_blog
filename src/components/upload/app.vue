<template>
  <div style="height:100%">
    <div style="height:100%" class="row subCenter mainCenter" v-if="!isShowDetail">
      <Button type="primary" @click="handleUploadButton">上传markdown文件</Button>
      <Button type="primary" @click="handleGoWrite">立刻写作</Button>
    </div>
    <input type="file" @change="handleUpload" id="uploadInputFile" />
    <!-- 编辑部分 -->
    <div v-if="isShowDetail" style="padding: 0 20px 20px;">
      <div style="padding:20px 0;">
        <Button @click="back" type="primary" size="small" icon="el-icon-arrow-left" circle></Button>
        <Button @click="submit" type="primary" size="small">上传到服务器</Button>
      </div>
      <Info title="标题" v-model="title" />
      <Info title="副标题" v-model="subtitle" />
      <Info title="时间" v-model="date" />
      <Info title="作者" v-model="author" />
      <Tag :tags="mdTag" @change="tagChange" @add="tagAdd" />
      <Editor :value="markdown" ref="editor" @handleContent="handleContent" />
    </div>
  </div>
</template>

<script>
import { Button, Input, Message } from "element-ui";
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
      markdown: "",
      isShowDetail: false
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
          // console.log(mdSource);
          var mdTitle = mdSource.split("---")[1];
          var info = this.getInfo(mdTitle);
          this.mdTag = this.getTag(mdTitle); //标签
          this.title = info.title; //标题
          this.subTitle = info.subtitle; //副标题
          this.date = info.date; //日期
          this.author = info.author; //作者
          this.markdown = marked(mdSource).split("<hr>")[2]; //文章内容
          this.isShowDetail = true;
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
    judge() {
      this.$refs.editor.getValue();
      let { author, date, markdown, mdTag, subtitle, title } = this;
      if (title.length === 0) {
        Message.error("标题必填");
        return true;
      }
      if (date.length === 0) {
        Message.error("时间必填");
        return true;
      }
      if (mdTag.length === 0) {
        Message.error("至少添加一个标签");
        return true;
      }
      if (markdown.length === 0) {
        Message.error("文章内容是必填的");
        return true;
      }
      return false;
    },
    handleContent(e) {
      this.markdown = e;
    },
    submit() {
      if (this.judge()) return;
      const { author, date, markdown, mdTag, subtitle, title } = this;
      post("upload", {
        author,
        date,
        markdown,
        mdTag,
        subtitle,
        title
      }).then(e => {
        this.back();
      });
    },
    handleUploadButton() {
      document.getElementById("uploadInputFile").click();
    },
    handleGoWrite() {
      this.resetValue();
      this.isShowDetail = true;
    },
    resetValue() {
      this.title = "";
      this.subtitle = "";
      this.date = "";
      this.author = "";
      this.mdTag = [];
      this.markdown = "";
      document.getElementById("uploadInputFile").value = "";
    },
    back() {
      this.resetValue();
      this.isShowDetail = false;
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
#uploadInputFile {
  display: none;
}
</style>
