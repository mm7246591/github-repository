<script setup>
import { RouterLink } from "vue-router";
import { onMounted, computed } from "@vue/runtime-core";
import { useUserStore } from "../stores/user";
import { Search } from "@element-plus/icons-vue";
import Header from "../components/Header.vue";
import ColorLanguage from "../components/ColorLanguage.vue";
const user = useUserStore();
onMounted(async () => {
  await user.getRepos();
});
const filterRepo = computed(() => {
  if (user.input) {
    user.isMax = false;
    return user.sortReops.filter((repo) =>
      repo.name.toLowerCase().includes(user.input)
    );
  }
  return user.sortReops;
});
const scrollEvent = () => {
  user.bottomOfWindow = Math.floor(
    document.documentElement.offsetHeight -
      document.documentElement.scrollTop -
      window.innerHeight <=
      0
  );
  if (user.bottomOfWindow && user.isMax === false) {
    loadMore();
  }
};
const loadMore = () => {
  user.num += 10;
  user.getRepos();
};
window.addEventListener("scroll", scrollEvent);
</script>
<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-main>
      <div class="user">
        <el-image :src="user.avatar" />
        <div class="name">{{ user.name }}</div>
        <div class="userName">{{ user.username }}</div>
        <div class="location">
          <svg
            class="icon"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
          >
            <path
              fill-rule="evenodd"
              d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"
            ></path>
          </svg>
          {{ user.location }}
        </div>
      </div>
      <div class="repos" @scroll="scrollEvent">
        <el-input
          v-model.trim="user.input"
          placeholder="Find a repository"
          :prefix-icon="Search"
        />
        <div class="repo" v-for="repo of filterRepo" :key="repo.node_id">
          <div class="text">
            <RouterLink :to="{ path: `/${repo.full_name}` }">
              <span>{{ repo.name }}</span></RouterLink
            >
            <span>{{ repo.visibility }}</span>
          </div>
          <span class="description" v-if="repo.description">{{
            repo.description
          }}</span>
          <div class="intro">
            <ColorLanguage :language="repo.language" />
            <span class="count" v-if="repo.forks_count"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                class="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                ></path>
              </svg>
              {{ repo.forks_count }}</span
            >
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
        </div>
        <span class="noData" v-if="user.isMax && user.repos.length > 10"
          >Sorry No more Repositories.....</span
        >
      </div>
    </el-main>
  </el-container>
</template>
<style scoped>
.el-container {
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
}
.el-header {
  padding: 0;
}
.el-main {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
  background-color: #0d1117;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 500;
  line-height: 1.2;
  overflow: hidden;
}
.user {
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
}
.user .name {
  font-size: 24px;
  line-height: 1.25;
  color: #c1c1c1;
}
.user .userName {
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #8b949e;
  margin: 10px 0;
}
.user .el-image {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
.repos {
  height: auto;
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 50px;
}
.el-input {
  width: 300px;
  margin-bottom: 10px;
  --el-fill-color-blank: #0d1117;
  --el-text-color-regular: #8b949e;
  --el-border-color: #30363d;
  --el-font-size-base: 14px;
}
.repo {
  width: 100%;
  height: 120px;
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
.description {
  height: 50px;
  color: #8b949e;
  margin: 10px 0;
  font-size: 16px;
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
.intro .count {
  width: 25px;
  height: 20px;
  margin-right: 10px;
}
.icon {
  fill: currentColor;
}
.intro .time {
  margin-left: 0;
}
.el-pagination {
  margin: auto;
  --el-text-color-primary: white;
  --el-fill-color-blank: #0d1117;
  --el-pagination-font-size: 16px;
}
.repos .noData {
  color: #8b949e;
  font-size: 36px;
  text-align: center;
}
</style>
