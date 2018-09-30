import Vue from "vue";
import Router from "vue-router";
import Box from "@/components/Box/box.vue";
import Home from "../components/Home/home.vue";
import Upload from "../components/upload/app.vue";

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
      path: "/upload",
      name: "Upload",
      component: Upload
    }
  ]
});
