<script setup>
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import Header from "../components/Header.vue";
const props = defineProps({
  username: String,
  repo: String,
});
console.log(props.username, props.repo);
onMounted(async () => {
  await getRepo();
});
const getRepo = async () => {
  axios(`https://api.github.com/repos/${props.username}/${props.repo}`).then(
    (res) => {
      console.log(res.data);
    }
  );
};
</script>
<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-main>
      <div class="demo-progress">
        <el-progress :percentage="(50, 30)" />
        <el-progress :percentage="100" :format="format" />
        <el-progress :percentage="100" status="success" />
        <el-progress :percentage="100" status="warning" />
        <el-progress :percentage="50" status="exception" /></div
    ></el-main>
  </el-container>
</template>

<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
}
.el-header {
  padding: 0;
}
.el-main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: auto;
  background-color: #0d1117;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 500;
  line-height: 1.2;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
