<template>
  <div class="detail-box">
    <div class="row subCenter">
      <div v-for="(item, index) in detail.mdTag" :key="index" class="tag">{{item}}</div>
    </div>
    <div class="title">{{detail.title}}</div>
    <div class="info">Posted by {{detail.author || 'Binna'}} on {{detail.date.slice(0,10)}}</div>
    <div v-html="detail.markdown"></div>
  </div>
</template>

<script>
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
  name: "detailPage",
  data() {
    return {
      detail: {
        author: "",
        date: "",
        markdown: "",
        mdTag: [],
        subtitle: "",
        title: "",
        _id: "",
        _v: 0
      }
    };
  },
  created() {
    post("detail", { id: this.$route.params.id }).then(e => {
      this.detail = e;
    });
  },
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  }
};
</script>

<style scoped>
.detail-box {
  padding-top: 100px;
  width: 750px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.tag {
  color: #bfbfbf;
  border: 1px solid #bfbfbf;
  border-radius: 13px;
  height: 23px;
  padding: 0 10px;
  line-height: 23px;
  margin-right: 5px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 14px;
}
</style>
<style>
pre {
  background: #75ca86 !important;
  border-radius: 8px !important;
  padding: 10px !important;
  font-size: 15px !important;
}
h3,
h2,
h1 {
  position: relative;
}
h3::before {
  content: "#";
  position: absolute;
  left: -15px;
  color: #337ab7;
}
h2::before {
  content: "#";
  position: absolute;
  left: -15px;
  color: #337ab7;
}
h1::before {
  content: "#";
  position: absolute;
  left: -15px;
  color: #337ab7;
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
}
.info {
  font-style: italic;
  margin-top: 8px;
  font-family: Lora, "Times New Roman", serif;
}
blockquote {
  position: relative;
  margin-left: 20px;
}
blockquote::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 4px;
  background-color: orange;
  left: -20px;
}
</style>

