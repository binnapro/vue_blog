<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.row {
  display: flex;
}
.col {
  display: flex;
  flex-direction: column;
}
.mainStart {
  justify-content: flex-start;
}
.mainEnd {
  justify-content: flex-end;
}
.mainCenter {
  justify-content: center;
}
.mainBetween {
  justify-content: space-between;
}
.mainAround {
  justify-content: space-around;
}
.subStart {
  align-items: flex-start;
}
.subEnd {
  align-items: flex-end;
}
.subCenter {
  align-items: center;
}
.flex1{
  flex: 1;
}
</style>
