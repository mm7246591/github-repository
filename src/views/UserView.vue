<script setup>
import { RouterLink } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { useUserStore } from "../stores/user";
import Header from "../components/Header.vue";
// const props = defineProps({
//   name: String,
// });
const user = useUserStore();
onMounted(async () => {
  await user.getRepos();
});
</script>
<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-main>
      <div class="user">
        <el-image :src="user.avatar" />
        <div class="name">{{ user.name }}</div>
        <div class="userName">{{ user.userName }}</div>
      </div>
      <div class="repos">
        <div class="repo" v-for="repo of user.sortReops" :key="repo.id">
          <div class="text">
            <RouterLink :to="{ path: '/' }">
              <span>{{ repo.name }}</span></RouterLink
            >
            <span>{{ repo.visibility }}</span>
          </div>
          <div class="intro">
            <span class="HtmlColor" v-if="repo.language === 'HTML'"></span>
            <span class="CssColor" v-else-if="repo.language === 'CSS'"></span>
            <span
              class="JsColor"
              v-else-if="repo.language === 'JavaScript'"
            ></span>
            <span
              class="TsColor"
              v-else-if="repo.language === 'TypeScript'"
            ></span>
            <span class="VueColor" v-else-if="repo.language === 'Vue'"></span>
            <span class="JavaColor" v-else-if="repo.language === 'Java'"></span>
            <span v-if="repo.language">{{ repo.language }}</span>
            <span class="time" v-if="repo.time.day > 30"
              >Updated on {{ repo.time.date }} {{ repo.time.month }}
              {{ repo.time.year }}</span
            >
            <span class="time" v-else-if="repo.time.day > 0"
              >Updated {{ repo.time.day }} days ago</span
            >
            <span class="time" v-else
              >Updated {{ repo.time.hour }} hours ago</span
            >
          </div>
          <div></div>
        </div>
      </div>
    </el-main>
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
}
.user {
  display: flex;
  flex-direction: column;
  color: white;
}
.user .name {
  font-size: 24px;
  line-height: 1.25;
}
.user .userName {
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #8b949e;
}
.user .el-image {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
.repos {
  height: 100%;
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 50px;
}
.repo {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #30363d;
}
.repo .text {
  height: 50%;
  color: white;
  margin-top: 10px;
}
.repo .text a {
  text-decoration: none;
  color: #58a6ff;
  font-size: 20px;
  transition: 0.3s;
}
.repo .text a:hover {
  text-decoration: underline;
}
.repo .text span {
  margin-right: 10px;
}
.text span:nth-child(1) {
  font-size: 20px;
}
.text span:nth-child(2) {
  width: 50px;
  height: 50px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid #30363d;
  border-radius: 2rem;
  padding: 0 7px;
}
.repo .intro {
  height: 50%;
  color: #8b949e;
  font-size: 16px;
  position: relative;
}
.repo .intro span {
  margin: 0 10px;
}
.repo .intro .time {
  margin: 0;
}

.HtmlColor {
  position: absolute;
  top: 3px;
  left: -15px;
  width: 10px;
  height: 10px;
  background-color: #e34c26;
  border-radius: 50%;
}
.CssColor {
  position: absolute;
  top: 3px;
  left: -15px;
  width: 10px;
  height: 10px;
  background-color: #563d7c;
  border-radius: 50%;
}
.JsColor {
  position: absolute;
  top: 3px;
  left: -15px;
  width: 10px;
  height: 10px;
  background-color: #f1e05a;
  border-radius: 50%;
}
.TsColor {
  position: absolute;
  top: 3px;
  left: -15px;
  width: 10px;
  height: 10px;
  background-color: #2b7489;
  border-radius: 50%;
}
.VueColor {
  position: absolute;
  top: 3px;
  left: -15px;
  width: 10px;
  height: 10px;
  background-color: #41b883;
  border-radius: 50%;
}
.JavaColor {
  position: absolute;
  top: 3px;
  left: -15px;
  width: 10px;
  height: 10px;
  background-color: #b07219;
  border-radius: 50%;
}
</style>
