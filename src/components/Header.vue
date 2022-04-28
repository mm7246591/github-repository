<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";
import { useSearchStore } from "../stores/search";
import { useUserStore } from "../stores/user";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
const search = useSearchStore();
const user = useUserStore();
const active = ref(false);
onMounted(async () => {
  await user.getUser();
});
const searchEvent = () => {
  if (search.userSearch) {
    axios("https://api.github.com/users/" + search.userSearch).then((res) => {
      search.users.push(res.data);
    });
  } else {
    search.users = [];
  }
};
const sideBarEvent = () => {
  active.value = !active.value;
};
</script>
<template>
  <div class="header">
    <svg
      width="40"
      height="40"
      viewBox="0 0 16 16"
      version="1.1"
      class="sideBar"
      @click="sideBarEvent"
    >
      <path
        fill-rule="evenodd"
        d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"
      ></path>
    </svg>
    <div class="leftSide">
      <RouterLink :to="{ path: '/' }">
        <svg
          height="40"
          viewBox="0 0 16 16"
          version="1.1"
          width="40"
          class="logo"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          /></svg
      ></RouterLink>
      <el-input
        v-model.trim="search.userSearch"
        @change="searchEvent"
        placeholder="Searching"
        :prefix-icon="Search"
        size="large"
      />
    </div>
    <div class="avatar">
      <RouterLink
        :to="{
          path: `/${user.username}`,
        }"
      >
        <el-avatar :src="user.avatar"
      /></RouterLink>
    </div>
  </div>
  <div class="sideContent" v-if="active">
    <el-input
      v-model.trim="search.userSearch"
      @input="searchEvent"
      placeholder="Searching"
      :prefix-icon="Search"
      size="large"
    />
  </div>
</template>
<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #161b22;
}
.sideBar {
  color: #f0f6fc;
  fill: currentColor;
  display: none;
  cursor: pointer;
}
.leftSide {
  display: flex;
  align-items: center;
}
.leftSide .el-input {
  width: 400px;
  padding: 0 10px;
  --el-input-bg-color: #161b22;
  --el-input-text-color: white;
  --el-text-color-placeholder: #c9d1d9;
  --el-border-color: #30363d;
}
.logo {
  color: white;
  fill: currentColor;
  margin: 10px 0;
}
.header > .avatar {
  margin: 10px;
}
.avatar a {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.sideContent {
  width: 100%;
  height: 100px;
  background-color: #161b22;
  color: #f0f6fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sideContent .el-input {
  width: 90%;
  padding: 0 10px;
  --el-input-bg-color: #161b22;
  --el-input-text-color: white;
  --el-text-color-placeholder: #c9d1d9;
  --el-border-color: #30363d;
}
@media screen and (max-width: 768px) {
  .header {
    justify-content: space-between;
  }
  .sideBar {
    display: inline-block;
    margin: 10px;
  }
  .leftSide .el-input {
    display: none;
  }
}
</style>
