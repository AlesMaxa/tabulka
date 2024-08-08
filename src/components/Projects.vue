<template>
  <div>
    <h1>Projects</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Project</th>
          <th>Description</th>
          <th>Tasks Count</th>
          <th>Persons Count</th>
          <th>Uncompleted Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.project }}</td>
          <td>{{ project.description }}</td>
          <td>{{ project.taskscount }}</td>
          <td>{{ project.personscount }}</td>
          <td>{{ project.uncompletedcount }}</td>
          <td>
            <button @click="editProject(project)">Edit</button>
            <button @click="deleteProject(project.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="showForm = !showForm">
      {{ showForm ? "Hide Form" : "Add Project" }}
    </button>

    <div v-if="showForm">
      <h2>{{ isEditing ? "Edit Project" : "Add New Project" }}</h2>
      <form @submit.prevent="isEditing ? updateProject() : addProject()">
        <div>
          <label for="project">Project Name:</label>
          <input type="text" v-model="currentProject.project" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="text" v-model="currentProject.description" required />
        </div>
        <button type="submit">
          {{ isEditing ? "Update" : "Add" }} Project
        </button>
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
      projects: [],
      showForm: false,
      isEditing: false,
      currentProject: {
        //  id: null,
        project: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get(
          "https://sdaapi.glabazna.eu/js6projects"
        );
        this.projects = response.data.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    async addProject() {
      try {
        const response = await axios.post(
          "https://sdaapi.glabazna.eu/js6projects",
          this.currentProject
        );
        this.projects.push(response.data);
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error("Error adding project:", error);
      }
    },
    editProject(project) {
      this.isEditing = true;
      this.showForm = true;
      this.currentProject = { ...project };
    },
    async updateProject() {
      try {
        const response = await axios.put(
          `https://sdaapi.glabazna.eu/js6projects/${this.currentProject.id}`,
          this.currentProject
        );
        const index = this.projects.findIndex(
          (p) => p.id === this.currentProject.id
        );
        this.projects.splice(index, 1, response.data);
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error("Error updating project:", error);
      }
    },
    async deleteProject(id) {
      try {
        await axios.delete(`https://sdaapi.glabazna.eu/js6projects/${id}`);
        this.projects = this.projects.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    },
    resetForm() {
      this.isEditing = false;
      this.currentProject = {
        id: null,
        project: "",
        description: "",
      };
      this.showForm = false;
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

input[type="text"] {
  padding: 5px;
  width: 300px;
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

button[type="button"] {
  background-color: #f44336;
}

button[type="button"]:hover {
  background-color: #e41d1d;
}
</style>
