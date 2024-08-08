<template>
  <div id="app">
    <nav>
      <router-link to="/">Tasks</router-link>
      <router-link to="/projects">Projects</router-link>
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
