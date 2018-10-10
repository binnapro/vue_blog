<template>
  <div class="box">
    <Nav />
    <div class="top row subCenter mainCenter">
      <div class="title">TAGS</div>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Nav from "./nav";
import Footer from "./footer";
export default {
  name: "Box",
  data() {
    return {};
  },
  components: {
    Nav,
    Footer
  }
};
</script>

<style scoped>
.box {
  height: 100%;
}
.top {
  background-image: url("../../assets/tag-bg.jpg");
  height: 227px;
  width: 100%;
  background-size: cover;
  background-position: center;
}
.title {
  font-size: 60px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
