<template>
  <div>
    <nav>
      <router-link to="/">Projects</router-link>
      <router-link to="/tasks">Tasks</router-link>
      <router-link to="/persons">Persons</router-link>
      <router-link to="/positions">Positions</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  display: flex;
  gap: 10px;
  background-color: #f8f8f8;
  padding: 10px;
}
</style>
