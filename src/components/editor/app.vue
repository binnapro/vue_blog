<template>
  <div>
    <div id="wangeditor"></div>
  </div>
</template>

<script>
import E from "wangeditor";
var editor2 = new E("#wangeditor");
export default {
  name: "editor",
  props: ["value"],
  data() {
    return {};
  },
  mounted() {
    editor2.create();
    editor2.txt.html(this.value);
  },
  methods: {
    getValue() {
      this.$emit("handleContent", editor2.txt.html());
    }
  }
};
</script>

<style>
#wangeditor .w-e-toolbar {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
#wangeditor .w-e-text-container {
  height: 550px !important;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>

