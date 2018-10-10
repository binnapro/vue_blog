<template>
  <div class="list-box">
    <div v-for="(item, index) in pageList" :key="index" class="list-item">
      <div class="title">
        <span @click="go(item._id)">{{item.title}}</span>
      </div>
      <div class="row subCenter info-box">
        <div class="row subCenter date-box">
          <i class="el-icon-time"></i>
          <div class="date">{{item.date.slice(0,10)}}</div>
        </div>
        <div class="row subCenter tag-box">
          <i class="el-icon-star-off"></i>
          <div v-for="(iteml, indexl) in item.mdTag" :key="indexl" class="tag">{{iteml}}</div>
        </div>
      </div>
      <div class="content">{{delHtmlTag(item.markdown)}}</div>
      <div class="more">
        <span @click="go(item._id)">Read More</span>
      </div>
    </div>
    <div class="row mainEnd pagination">
      <Pagination class="myPagination" :background="PaginationIsBackground" layout="prev, pager, next" :total="list.length" :page-size="pageSize" @current-change="pageChange" />
    </div>
  </div>
</template>

<script>
import { Pagination } from "element-ui";
import { post } from "../../../util/request.js";

export default {
  data() {
    return {
      list: [],
      pageSize: 5,
      current: 1,
      PaginationIsBackground: true
    };
  },
  created() {
    post("list", {}).then(e => {
      this.list = e;
    });
  },
  computed: {
    pageList() {
      let start = (this.current - 1) * this.pageSize;
      let end = start + this.pageSize;
      return this.list.slice(start, end);
    }
  },
  methods: {
    delHtmlTag(e) {
      return e.replace(/<[^>]+>/g, "").slice(0, 110) + "...";
    },
    pageChange(e) {
      this.current = e;
    },
    go(id) {
      this.$router.push({ name: "Detail", params: { id } });
    }
  },
  components: {
    Pagination
  }
};
</script>

<style scoped>
.list-item {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 25px 0 15px;
  border-bottom: 1px solid #eee;
  font-size: 15px;
}
.info-box {
  padding-top: 10px;
}
.tag-box i {
  margin-top: -2px;
  margin-right: 5px;
  margin-left: 40px;
  color: #414a51;
}
.date-box i {
  margin-top: -2px;
  color: #414a51;
}
.title {
  font-size: 17px;
  cursor: pointer;
}
.title span {
  position: relative;
}
.title span:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #42b983;
  bottom: -2px;
  left: 0;
  transform: scale(0);
  transition: all 0.3s;
}
.title span:hover::after {
  transform: scale(1);
}
.tag {
  color: #414a51;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.tag:hover {
  color: #42b983;
}
.date {
  margin-left: 5px;
}
.content {
  color: #a3a3a3;
  padding: 10px 0;
}
.more {
  color: #42b983;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
.pagination {
  padding-top: 20px;
  padding-bottom: 40px;
}
</style>
<style>
.myPagination .active {
  background: #42b983 !important;
}
a {
  text-decoration: none;
}
</style>
