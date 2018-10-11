<template>
  <div>
    <div class="tag-box row flexWrap">
      <div :class="getTagClass('all')" @click="showAll">Show All<sup>{{list.length}}</sup></div>
      <div v-for="(item, index) in tag" :key="index" :class="getTagClass(item.tag)" @click="initTagList(item.tag)">{{item.tag}}<sup>{{item.number}}</sup></div>
    </div>
    <!-- 内容列表 -->
    <div class="bottom">
      <div v-for="(item,index) in trueList" :key="index" class="item" @click="goDetail(item._id)">
        <div class="row subCenter title">
          {{item.title}}
        </div>
        <div class="row subCenter tagInfo">
          <div class="date">{{item.date.slice(0,10)}}</div>
          <div class="row subCenter">
            <div v-for="(iteml,indexl) in item.mdTag" :key="indexl" class="infoTag">{{iteml}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../../../util/request.js";
export default {
  name: "tagPage",
  data() {
    return {
      tag: [],
      select: "",
      list: [], //全部文章
      tagList: [] //tag筛选的文章
    };
  },
  created() {
    this.initTag();
    this.getCount();
    this.select = this.$route.params.id;
    this.initTagList(this.$route.params.id);
  },
  computed: {
    trueList() {
      return this.select === "all" ? this.list : this.tagList;
    }
  },
  methods: {
    initTagList(tag) {
      // 通过tag获取文章的列表
      if (tag === "all") return;
      this.select = tag;
      post("search/tag", { id: tag }).then(e => {
        this.tagList = e;
      });
      // 刷新一下全部列表
      this.getCount();
    },
    initTag() {
      // 获取全部tag -> tag
      post("tag", {}).then(e => {
        this.tag = e;
      });
    },
    getCount() {
      // 获取全部的文章数量,并且将全部文章存起来->list
      post("list", {}).then(e => {
        this.list = e;
      });
    },
    showAll() {
      this.select = "all";
      this.getCount();
    },
    getTagClass(tag) {
      return this.select === tag ? "tag active" : "tag";
    },
    goDetail(id) {
      this.$router.push({ name: "Detail", params: { id } });
    }
  }
};
</script>

<style scoped>
.tag-box {
  width: 750px;
  margin: 0 auto;
  padding: 60px 0 40px;
}
.tag {
  height: 26px;
  border-radius: 13px;
  background-color: #bbe;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
  color: #fff;
  cursor: pointer;
}
.active {
  background: #0085a1;
  box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 6px,
    rgba(0, 0, 0, 0.239216) 0 1px 4px;
}
.bottom {
  width: 750px;
  margin: 0 auto;
}
.title {
  font-size: 18px;
  font-weight: 500;
  color: #4e4e4e;
  line-height: 1.3;
}
.item {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial,
    "PingFang SC", "Hiragino Sans GB", STHeiti, "Microsoft YaHei",
    "Microsoft JhengHei", "Source Han Sans SC", "Noto Sans CJK SC",
    "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC",
    "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
.tagInfo {
  font-size: 15px;
  margin-top: 5px;
  color: #656565;
}
.date {
  margin-right: 50px;
}
.infoTag {
  margin-left: 10px;
}
</style>
