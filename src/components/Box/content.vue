<template>
  <div class="content row mainCenter">
    <div class="left">
      <router-view />
    </div>
    <div class="right">
      <div class="title">FEATURED TAGS</div>
      <div class="row flexWrap feature-tags">
        <div class="tag" v-for="(item, index) in tag" :key="index" @click="goTag(item.tag)">{{item.tag}}</div>
      </div>
      <div class="title">ABOUT ME</div>
      <div class="about-me">
        <div class="avatar"></div>
        <div class="name">Binna's blog</div>
        <div class="info">你在偷看我~</div>
      </div>
    </div>
  </div>
</template>

<script>
// Icon主要是引入css样式,使用className直接使用
import { post } from "../../../util/request.js";
export default {
  name: "mainBox",
  data() {
    return {
      tag: []
    };
  },
  created() {
    post("tag", {}).then(e => {
      this.tag = e;
    });
  },
  components: {},
  methods: {
    goTag(id) {
      this.$router.push({ name: "Tag", params: { id } });
    }
  }
};
</script>

<style scoped>
.left {
  width: 750px;
  margin-right: 60px;
}
.right {
  width: 220px;
  padding-top: 20px;
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
.title {
  font-weight: bold;
  color: #ccc;
  font-size: 14px;
}
.avatar {
  height: 170px;
  width: 170px;
  background-image: url("../../assets/IMG_2216.jpg");
  background-position: center;
  background-size: cover;
  border-radius: 8px;
}
.name {
  margin-top: 8px;
  color: #bfbfbf;
}
.info {
  margin-top: 5px;
  font-size: 13px;
  color: #bfbfbf;
}
.feature-tags {
  padding-top: 10px;
  padding-bottom: 15px;
}
.about-me {
  padding-top: 10px;
}
</style>