<template>
  <div>
    <h1>Positions</h1>

    <form @submit.prevent="submitForm">
      <div>
        <label for="position">Position:</label>
        <input type="text" v-model="form.position" required />
      </div>
      <button type="submit">
        {{ form.id ? "Update Position" : "Add Position" }}
      </button>
      <button type="button" v-if="form.id" @click="resetForm">Cancel</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="position in positions" :key="position.id">
          <td>{{ position.id }}</td>
          <td>{{ position.position }}</td>
          <td>
            <button @click="editPosition(position)">Edit</button>
            <button @click="deletePosition(position.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      positions: [],
      form: {
        id: null,
        position: "",
      },
    };
  },
  created() {
    this.fetchPositions();
  },
  methods: {
    fetchPositions() {
      axios
        .get("https://sdaapi.glabazna.eu/js6positions")
        .then((response) => {
          this.positions = response.data.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the positions:", error);
        });
    },
    submitForm() {
      if (this.form.id) {
        // Update existing position
        axios
          .put(`https://sdaapi.glabazna.eu/js6positions/${this.form.id}`, {
            position: this.form.position,
          })
          .then((response) => {
            this.fetchPositions();
            this.resetForm();
          })
          .catch((error) => {
            console.error("There was an error updating the position:", error);
          });
      } else {
        // Add new position
        axios
          .post("https://sdaapi.glabazna.eu/js6positions", {
            position: this.form.position,
          })
          .then((response) => {
            this.fetchPositions();
            this.resetForm();
          })
          .catch((error) => {
            console.error("There was an error adding the position:", error);
          });
      }
    },
    editPosition(position) {
      this.form.id = position.id;
      this.form.position = position.position;
    },
    deletePosition(id) {
      if (confirm("Are you sure you want to delete this position?")) {
        axios
          .delete(`https://sdaapi.glabazna.eu/js6positions/${id}`)
          .then((response) => {
            this.fetchPositions();
          })
          .catch((error) => {
            console.error("There was an error deleting the position:", error);
          });
      }
    },
    resetForm() {
      this.form.id = null;
      this.form.position = "";
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: left;
}
form {
  margin-bottom: 20px;
}
form div {
  margin-bottom: 10px;
}
button {
  margin-right: 5px;
}
</style>
