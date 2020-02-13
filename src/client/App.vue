<template>
  <div class="container">
    <router-view />
  </div>
</template>
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background: black;
  }
  .container {
    margin: auto;
    max-width: 1025px;
    min-height: 100%;
    overflow: hidden;
    background: white;
    padding: 0 1rem;
  }
</style>
