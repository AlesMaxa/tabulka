<template>
  <div id="app">
    <nav>
      <router-link to="/">Projects</router-link>
      <router-link to="/tasks">Tasks</router-link>
      <router-link to="/persons">Persons</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #4caf50;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #2e7d32;
}
</style>
