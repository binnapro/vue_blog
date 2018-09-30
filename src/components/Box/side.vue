<template>
  <div class="left">
    <div class="top col mainCenter">
      <img src="http://cdn.muyucloud.com/binna/favicon.png" alt="" class="avatar">
      <div class="title">Binnayao</div>
      <div class="brief">你在偷看我...</div>
    </div>
    <div class="bottom">
      <div v-for="(item,index) in menu" :key="index" class="item">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Icon主要是引入css样式,使用className直接使用
import { Icon } from "element-ui";
export default {
  name: "side",
  data() {
    return {
      menu: [
        { title: "Home", icon: "el-icon-mobile-phone" },
        { title: "Tags", icon: "el-icon-news" },
        { title: "About me", icon: "el-icon-sort" }
      ]
    };
  },
  components: {
    Icon
  }
};
</script>

<style scoped>
.avatar {
  height: 76px;
  width: 76px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: #3f4d67;
}
.left {
  width: 240px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.top {
  height: 200px;
  background-image: url("../../assets/brand.jpg");
  padding-left: 30px;
  background-size: cover;
  background-position: center;
}
.title {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.brief {
  color: aquamarine;
  font-size: 14px;
  font-weight: bold;
}
.bottom {
  padding: 12px 0;
}
.item{
  height: 44px;
  color: #727272;
  font-weight:bold;
  line-height: 44px;
  padding-left: 10px;
  cursor: pointer;
}
.item i {
  font-weight:bold;
}
</style>