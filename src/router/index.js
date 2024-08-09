import { createRouter, createWebHistory } from "vue-router";
import Projects from "../components/Projects.vue";
import Tasks from "../components/TaskTable.vue";
import Persons from "../components/Persons.vue";

const routes = [
  {
    path: "/",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/persons",
    name: "Persons",
    component: Persons,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
