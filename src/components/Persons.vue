<template>
  <div>
    <h1>Persons</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in persons" :key="person.id">
          <td>{{ person.id }}</td>
          <td>{{ person.first }}</td>
          <td>{{ person.last }}</td>
          <td>{{ person.position }}</td>
          <td>
            <button @click="editPerson(person)">Edit</button>
            <button @click="deletePerson(person.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="showForm = !showForm">
      {{ showForm ? "Hide Form" : isEditing ? "Cancel Edit" : "Add Person" }}
    </button>
    <div v-if="showForm">
      <h2>{{ isEditing ? "Edit Person" : "Add New Person" }}</h2>
      <form @submit.prevent="isEditing ? updatePerson() : addPerson()">
        <div>
          <label for="first">First Name:</label>
          <input type="text" v-model="currentPerson.first" required />
        </div>
        <div>
          <label for="last">Last Name:</label>
          <input type="text" v-model="currentPerson.last" required />
        </div>
        <div>
          <label for="positionid">Position ID:</label>
          <input type="number" v-model="currentPerson.positionid" required />
        </div>
        <button type="submit">{{ isEditing ? "Update" : "Add" }} Person</button>
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
      persons: [],
      showForm: false,
      isEditing: false,
      currentPerson: {
        id: null, // ID nebude odesíláno při přidání nového záznamu
        first: "",
        last: "",
        positionid: null, // ID pozice je volitelné, protože není cizí klíč
      },
    };
  },
  created() {
    console.log("Persons component has been created");
    this.fetchPersons();
  },

  methods: {
    async fetchPersons() {
      try {
        const response = await axios.get(
          "https://sdaapi.glabazna.eu/js6persons"
        );
        this.persons = response.data.data;
      } catch (error) {
        console.error("Error fetching persons:", error);
      }
    },
    async addPerson() {
      const personToAdd = {
        first: this.currentPerson.first,
        last: this.currentPerson.last,
        positionid: this.currentPerson.positionid,
      };
      try {
        const response = await axios.post(
          "https://sdaapi.glabazna.eu/js6persons",
          personToAdd
        );
        this.persons.push(response.data.data);
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error("Error adding person:", error);
      }
    },
    editPerson(person) {
      this.isEditing = true;
      this.showForm = true;
      this.currentPerson = { ...person };
    },
    async updatePerson() {
      const personToUpdate = {
        first: this.currentPerson.first,
        last: this.currentPerson.last,
        positionid: this.currentPerson.positionid,
      };
      try {
        const response = await axios.put(
          `https://sdaapi.glabazna.eu/js6persons/${this.currentPerson.id}`,
          personToUpdate
        );
        const index = this.persons.findIndex(
          (p) => p.id === this.currentPerson.id
        );
        this.$set(this.persons, index, response.data.data);
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error("Error updating person:", error);
      }
    },
    async deletePerson(id) {
      try {
        await axios.delete(`https://sdaapi.glabazna.eu/js6persons/${id}`);
        this.persons = this.persons.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Error deleting person:", error);
      }
    },
    resetForm() {
      this.isEditing = false;
      this.currentPerson = {
        id: null, // Resetování ID
        first: "",
        last: "",
        positionid: null,
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
