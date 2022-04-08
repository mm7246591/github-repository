<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <el-container>
    <el-header> <Header /></el-header>
    <el-container>
      <el-aside width="200px">123</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-header {
  padding: 0;
}
.el-aside {
  height: 100vh;
  color: white;
  background-color: #0d1117;
}
.el-main {
  height: 100vh;
  color: white;
  background-color: #010409;
}
</style>
