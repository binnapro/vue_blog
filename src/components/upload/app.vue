<template>
  <div>
    <input type="file" @change="handleExceed">
    <div v-html="markdown"></div>
    <img v-bind:src="markdown" alt="">
  </div>
</template>

<script>
import { Upload } from "element-ui";
import { Base64 } from "js-base64";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";
import marked from "marked";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
export default {
  data() {
    return {
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
    handleExceed: function(e) {
      let file = e.target.files[0];
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(e) {
          console.log(e.target.result.split(",")[1]);
          var nihao = Base64.decode(e.target.result.split(",")[1]);
          this.markdown = marked(nihao);
        }.bind(this);
      }
    }
  },
  components: {
    Upload
  }
};
</script>

<style scoped>
</style>
