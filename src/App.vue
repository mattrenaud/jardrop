<template>
  <div id="app" class="container">
    <FileUpload/>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import FileUpload from "./components/FileUpload.vue";

@Component({ components: { FileUpload } })
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
