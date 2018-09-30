<template>
  <div class='right flex1'>
    <div class="top"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "right"
};
</script>
<style scoped>
.top {
  background-color: #4053af;
  height: 200px;
}
</style>
