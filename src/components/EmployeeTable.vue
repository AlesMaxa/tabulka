<template>
  <div>
    <h1>Task Table</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Project ID</th>
          <th>Completed</th>
          <th>Date</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.task }}</td>
          <td>{{ task.projectid }}</td>
          <td>{{ task.completed }}</td>
          <td>{{ task.date }}</td>
          <td>{{ task.priority }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="showForm = !showForm">
      {{ showForm ? "Hide Form" : "Add Task" }}
    </button>
    <div v-if="showForm">
      <h2>Add New Task</h2>
      <form @submit.prevent="addTask">
        <div>
          <label for="task">Task:</label>
          <input type="text" v-model="newTask.task" required />
        </div>
        <div>
          <label for="projectid">Project ID:</label>
          <input type="number" v-model.number="newTask.projectid" required />
        </div>
        <div>
          <label for="completed">Completed:</label>
          <input type="checkbox" v-model="newTask.completed" />
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="date" v-model="newTask.date" required />
        </div>
        <div>
          <label for="priority">Priority:</label>
          <input type="number" v-model.number="newTask.priority" required />
        </div>
        <button type="submit">Submit</button>
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
      newTask: {
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
        this.tasks = response.data.data; // Přístup k datům uvnitř objektu response.data.data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask() {
      // Převod boolean na 1 nebo 0
      const taskToAdd = {
        ...this.newTask,
        completed: this.newTask.completed ? 1 : 0,
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
    resetForm() {
      this.newTask = {
        task: "",
        projectid: null,
        completed: false,
        date: "",
        priority: null,
      };
    },
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}

form {
  margin-top: 20px;
}

form div {
  margin-bottom: 10px;
}

label {
  margin-right: 10px;
}

input[type="text"],
input[type="date"],
input[type="number"],
input[type="checkbox"] {
  padding: 5px;
  width: 200px;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
