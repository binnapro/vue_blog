<template>
  <div class="row subCenter inputItem">
    <div class="inputTag">{{title}}</div>
    <Input :placeholder="'请输入'+title" class="inputInput" size="small" :value="value" @input="$emit('input',$event)"/>
  </div>
</template>

<script>
import { Input } from "element-ui";
export default {
  props: ["title", "value"],
  data() {
    return {};
  },
  methods: {},
  components: {
    Input
  }
};
</script>

<style scoped>
.inputItem {
  margin-bottom: 10px;
}
.inputInput {
  width: 250px;
}
.inputTag {
  width: 60px;
  text-align: right;
  margin-right: 10px;
}
</style>
