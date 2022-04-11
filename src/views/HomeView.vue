<script setup>
import { useSearchStore } from "../stores/search";
import { useUserStore } from "../stores/user";
import { onMounted } from "@vue/runtime-core";
import { RouterLink } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import Header from "../components/Header.vue";

const search = useSearchStore();
const user = useUserStore();
onMounted(async () => {
  await user.getRepos();
});
console.log(search.users);
</script>

<template>
  <el-container>
    <el-header> <Header /></el-header>
    <el-container>
      <el-aside>
        <span>Recent Repositories</span>
        <div class="search">
          <el-input
            v-model.trim="user.input"
            placeholder="Searching"
            :prefix-icon="Search"
            @input="user.filterRecent"
          />
        </div>
        <div class="recentRepos">
          <div
            class="recentRepo"
            v-for="repo of user.filterRecent"
            :key="repo.node_id"
          >
            <div class="recentAvatar">
              <el-avatar :size="20" :src="user.avatar" />
            </div>
            <div class="recentName">
              <RouterLink :to="{ path: `/${repo.full_name}` }">{{
                repo.full_name
              }}</RouterLink>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <RouterLink
          class="user"
          v-for="user of search.users"
          :key="user.node_id"
          :to="{ path: `/user/${user.login}` }"
        >
          <div class="avatar">
            <el-image :src="user.avatar_url" />
          </div>
          <div class="text">
            <div class="userName">{{ user.username }}</div>
            <div class="name">{{ user.name }}</div>
          </div>
        </RouterLink>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-header {
  padding: 0;
}
.el-container {
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 500;
  line-height: 1.2;
}
.el-aside {
  width: 350px;
  height: auto;
  padding: 20px;
  color: white;
  background-color: #0d1117;
}
.el-aside .search {
  margin: 20px 0 5px 0;
}
.search .el-input {
  width: 100%;
  margin-bottom: 10px;
  --el-fill-color-blank: #0d1117;
  --el-text-color-regular: #8b949e;
  --el-border-color: #30363d;
  --el-font-size-base: 14px;
}
.el-aside .recentRepos {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #30363d;
}
.recentRepos .recentRepo {
  height: 20px;
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.recentRepo .recentAvatar {
  margin-right: 5px;
}
.recentRepo .recentName:hover {
  text-decoration: underline;
}
.recentName a {
  text-decoration: none;
  color: #c9d1d9;
}
.el-main {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 10px;
  color: white;
  background-color: #010409;
  text-decoration: none;
}
.user {
  width: 358px;
  height: 158px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #30363d;
  -webkit-box-shadow: 0 0 15px white;
  -moz-box-shadow: 0 0 15px white;
  box-shadow: 0 0 15px white;
  padding: 10px;
  text-decoration: none;
}
.avatar .el-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.text {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text .name {
  font-size: 24px;
  text-align: center;
  color: #c1c1c1;
}
.text .userName {
  font-size: 20px;
  text-align: center;
  color: #8b949e;
  margin: 10px 0;
}
</style>
