<template>
  <div class="">
    <Tag :key="index" v-for="(item,index) in tags" closable :disable-transitions="false" @close="handleClose(item,index)">
      {{item}}
    </Tag>
    <Input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <Button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</Button>
  </div>
</template>

<script>
import { Tag, Input, Button } from "element-ui";
export default {
  props: ["tags"],
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleInputConfirm(e) {
      if (this.inputValue) {
        this.$emit("add", this.inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleClose(tag, index) {
      this.$emit("change", index);
    }
  },
  components: {
    Input,
    Tag,
    Button
  }
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
