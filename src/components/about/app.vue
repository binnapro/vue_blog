<template>
  <div class="me-box">
    <div class="me-avatar"></div>
    <div class="me-name">Binnayao</div>
    <div class="me-assist">😮你在偷看我~</div>
  </div>
</template>

<script>
export default {
  name: "aboutMe",
  data() {
    return {};
  }
};
</script>

<style scoped>
.me-box {
  width: 750px;
  margin: 0 auto;
}
.me-avatar {
  background-image: url("../../assets/IMG_2216.jpg");
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background-size: cover;
  background-position: center;
  margin: -75px auto 20px;
}
.me-name{
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
.me-assist{
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
}
</style>
