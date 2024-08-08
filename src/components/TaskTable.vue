<template>
  <div>
    <h1>Task Table</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Completed</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.task }}</td>
          <td>{{ task.projectid }}</td>
          <td>{{ task.project }}</td>
          <td>{{ task.completed }}</td>
          <td>{{ task.date }}</td>
          <td>{{ task.priority }}</td>
          <td>
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="showForm = !showForm">
      {{ showForm ? "Hide Form" : isEditing ? "Cancel Edit" : "Add Task" }}
    </button>
    <div v-if="showForm">
      <h2>{{ isEditing ? "Edit Task" : "Add New Task" }}</h2>
      <form @submit.prevent="isEditing ? updateTask() : addTask()">
        <div>
          <label for="task">Task:</label>
          <input type="text" v-model="currentTask.task" required />
        </div>
        <div>
          <label for="projectid">Project ID:</label>
          <input
            type="number"
            v-model.number="currentTask.projectid"
            required
          />
        </div>
        <div>
          <label for="completed">Completed:</label>
          <input type="checkbox" v-model="currentTask.completed" />
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="date" v-model="currentTask.date" required />
        </div>
        <div>
          <label for="priority">Priority:</label>
          <input type="number" v-model.number="currentTask.priority" required />
        </div>
        <button type="submit">{{ isEditing ? "Update" : "Add" }} Task</button>
        <button type="button" @click="resetForm">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      showForm: false,
      isEditing: false,
      currentTask: {
        id: null,
        task: "",
        projectid: null,
        completed: false,
        date: "",
        priority: null,
      },
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("https://sdaapi.glabazna.eu/js6tasks");
        this.tasks = response.data.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask() {
      const taskToAdd = {
        task: this.currentTask.task,
        projectid: this.currentTask.projectid,
        completed: this.currentTask.completed ? 1 : 0,
        date: this.currentTask.date,
        priority: this.currentTask.priority,
      };
      try {
        const response = await axios.post(
          "https://sdaapi.glabazna.eu/js6tasks",
          taskToAdd
        );
        this.tasks.push(response.data);
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    editTask(task) {
      this.isEditing = true;
      this.showForm = true;
      this.currentTask = { ...task };
      this.currentTask.completed = this.currentTask.completed === 1;
    },
    async updateTask() {
      const taskToUpdate = {
        task: this.currentTask.task,
        projectid: this.currentTask.projectid,
        completed: this.currentTask.completed ? 1 : 0,
        date: this.currentTask.date,
        priority: this.currentTask.priority,
      };
      try {
        const response = await axios.put(
          `https://sdaapi.glabazna.eu/js6tasks/${this.currentTask.id}`,
          taskToUpdate
        );
        const index = this.tasks.findIndex((t) => t.id === this.currentTask.id);
        this.tasks.splice(index, 1, response.data);
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`https://sdaapi.glabazna.eu/js6tasks/${id}`);
        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    resetForm() {
      this.isEditing = false;
      this.currentTask = {
        id: null,
        task: "",
        projectid: null,
        completed: false,
        date: "",
        priority: null,
      };
      this.showForm = false;
    },
  },
};
</script>

<style>
/* Stylování zůstává stejné */
</style>
