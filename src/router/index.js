import { createRouter, createWebHistory } from "vue-router";
import TaskTable from "../components/TaskTable.vue";
import Projects from "../components/Projects.vue";

const routes = [
  { path: "/", component: TaskTable },
  { path: "/projects", component: Projects },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
