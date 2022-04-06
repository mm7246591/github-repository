<script setup>
import Header from "../components/Header.vue";
const props = defineProps({
  name: String,
});
</script>
<template>
  <el-container>
    <Header />
    <el-main>Main</el-main>
  </el-container>
</template>
<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
}
</style>
