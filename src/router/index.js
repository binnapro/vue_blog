import Vue from "vue";
import Router from "vue-router";
import Box from "@/components/Box/box.vue";
import Box2 from "@/components/Box/box2.vue";
import Box3 from "@/components/Box/box3.vue";
import Box4 from "@/components/Box/box4.vue";
import Home from "../components/Home/home.vue";
import Upload from "../components/upload/app.vue";
import Detail from "../components/detail/app.vue";
import Tag from "../components/tag/app.vue";
import Me from "../components/about/app.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Box,
      children: [
        {
          path: "/",
          name: "Home",
          component: Home
        }
      ]
    },
    {
      path: "/detail",
      component: Box2,
      children: [
        {
          path: "/detail/:id",
          name: "Detail",
          component: Detail
        }
      ]
    },
    {
      path: "/tags",
      component: Box3,
      children: [
        {
          path: "/tags/:id",
          name: "Tag",
          component: Tag
        }
      ]
    },
    {
      path: "/me",
      component: Box4,
      children: [
        {
          path: "/me",
          name: "Me",
          component: Me
        }
      ]
    },
    {
      path: "/upload",
      name: "Upload",
      component: Upload
    }
  ]
});
