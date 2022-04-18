<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import { onMounted, ref, computed } from "@vue/runtime-core";
import { useSearchStore } from "../stores/search";
import { Search } from "@element-plus/icons-vue";
import Header from "../components/Header.vue";
import ColorLanguage from "../components/ColorLanguage.vue";
const props = defineProps({
  username: String,
});
const search = useSearchStore();
const num = ref(10);
const bottomOfWindow = ref(null);
const isMax = ref(false);
onMounted(async () => {
  search.userSearch = "";
  search.users = [];
  await getUser();
  await getRepos();
});
const scrollEvent = () => {
  bottomOfWindow.value = Math.floor(
    document.documentElement.offsetHeight -
      document.documentElement.scrollTop -
      window.innerHeight <=
      0
  );
  if (bottomOfWindow.value && isMax.value === false) {
    loadMore();
  }
};
const loadMore = () => {
  num.value += 10;
  getRepos();
};

window.addEventListener("scroll", scrollEvent);
const getUser = async () => {
  await axios(`https://api.github.com/users/${props.username}`).then((res) => {
    search.avatar = res.data.avatar_url;
    search.name = res.data.name;
    search.username = res.data.login;
    search.location = res.data.location;
  });
};
const getRepos = async () => {
  await axios(
    `https://api.github.com/users/${props.username}/repos?page=1&per_page=${num.value}`
  ).then((res) => {
    if (res.data.length < num.value) {
      isMax.value = true;
    }
    // timeEvent
    search.repos = [];
    const now = new Date();
    for (let i of res.data) {
      const time = new Date(i.pushed_at);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const days = parseInt(Math.abs(time - now) / 1000 / 60 / 60 / 24);
      const hours = parseInt(Math.abs(time - now) / 1000 / 60 / 60);
      i.time = {
        year: year,
        mongth: month,
        date: date,
        day: days,
        hour: hours,
      };
      search.repos.push(i);
    }
  });
};
const filterRepo = computed(() => {
  if (search.repoSearch) {
    isMax.value = false;
    return search.sortReops.filter((repo) =>
      repo.name.toLowerCase().includes(search.repoSearch)
    );
  }
  return search.sortReops;
});
</script>
<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-main>
      <div class="user">
        <el-image :src="search.avatar" />
        <div class="name">{{ search.name }}</div>
        <div class="userName">{{ search.username }}</div>
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
          {{ search.location }}
        </div>
      </div>
      <div class="repos" @scroll="scrollEvent">
        <el-input
          v-model.trim="search.repoSearch"
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
        <span class="noData" v-if="isMax && search.repos.length > 10"
          >Sorry No more Repositories.....</span
        >
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin: auto;
  background-color: #0d1117;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 500;
  line-height: 1.2;
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
@media screen and (max-width: 768px) {
  .el-main {
    flex-direction: column;
  }
  .user {
    height: 500px;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  }
  .repos {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
