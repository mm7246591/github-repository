<script setup>
import Header from "../components/Header.vue";
import { useSearchStore } from "../stores/index";

const search = useSearchStore();

console.log(search.users);
</script>

<template>
  <el-container>
    <el-header> <Header /></el-header>
    <el-container>
      <el-aside width="200px">123</el-aside>
      <el-main>
        <div class="user" v-for="user of search.users" :key="user.node_id">
          <div class="avatar">
            <el-image :src="user.avatar_url" />
          </div>
          <div class="text">
            <div class="name">{{ user.name }}</div>
            <div class="userName">{{ user.username }}</div>
          </div>
        </div>
        <!-- <div class="user">
          <div class="avatar">
            <el-avatar />
          </div>
          <div class="text">
            <div class="name">123</div>
            <div class="userName">123</div>
          </div>
        </div>
        <div class="user">
          <div class="avatar">
            <el-avatar />
          </div>
          <div class="text">
            <div class="name">123</div>
            <div class="userName">123</div>
          </div>
        </div> -->
      </el-main>
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
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: 150px;
  gap: 10px;
  color: white;
  background-color: #010409;
}
.user {
  width: 350px;
  height: 150px;
  margin: 10px 0;
  display: flex;
  transition: 0.3s ease-in-out;
}
.avatar .el-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.text .name {
  font-size: 24px;
  line-height: 1.25;
  color: #c1c1c1;
}
.text .userName {
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #8b949e;
  margin: 10px 0;
}
</style>
