<template>
  <div :class="getBoxClass">
    <div class="left">
      Binna blog
    </div>
    <div class="right row subCenter">
      <div v-for="(item,index) in menu" :key="index" class="item">
        <span @click="go(item)">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Icon主要是引入css样式,使用className直接使用
export default {
  name: "navbar",
  props: ["relative"],
  data() {
    return {
      menu: [
        { title: "Home", link: "Home" },
        { title: "Tags", link: "Tag", params: "all" },
        { title: "About me", link: "Me" }
      ]
    };
  },
  components: {},
  computed: {
    getBoxClass() {
      let base = "nav row mainBetween subCenter";
      return this.relative === undefined ? base : base + " navs";
    }
  },
  methods: {
    go(item) {
      if (item.params) {
        this.$router.push({ name: item.link, params: { id: item.params } });
      } else {
        this.$router.push({ name: item.link });
      }
    }
  }
};
</script>

<style scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  height: 60px;
}
.navs {
  color: #404040;
}
.left {
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.right {
  height: 100%;
}
.item {
  height: 100%;
  padding: 0 20px;
  line-height: 60px;
  cursor: pointer;
  font-weight: bold;
}
</style>