<template>
  <div class="box">
    <Nav relative/>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Nav from "./nav";
import Footer from "./footer";
export default {
  name: "Box2",
  data() {
    return {};
  },
  components: {
    Nav,
    Footer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  height: 100%;
}
</style>
