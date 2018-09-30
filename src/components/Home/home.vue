<template>
  <div>
    <div v-html="nihao"></div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";
import nihao from "../../file/2016-07-09-js-ganerates-random-number.md";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
export default {
  data() {
    return {
      visible: "",
      nihao
    };
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
</style>
