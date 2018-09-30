<template>
  <div class="row box">
    <Side></Side>
    <Content></Content>
  </div>
</template>

<script>
import Side from "./side";
import Content from "./content";
export default {
  name: "Box",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    Side,
    Content
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  height: 100%;
}
</style>
