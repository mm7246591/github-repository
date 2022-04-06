<script setup>
import Header from "../components/Header.vue";
</script>

<template>
  <el-container>
    <Header />
    <el-container>
      <div>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </div>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
}
div {
  display: flex;
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
