<script setup>
import { RouterLink } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { onMounted } from "@vue/runtime-core";
import { useSearchStore, useUserStore } from "../stores/index";
const search = useSearchStore();
const user = useUserStore();
const vFoucs = {
  mounted(el) {
    el.focus();
  },
};
onMounted(async () => {
  await user.getUser();
});
</script>
<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#010409"
      active-text-color="#010409"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <RouterLink :to="{ path: '/' }">
          <svg
            height="40"
            viewBox="0 0 16 16"
            version="1.1"
            width="40"
            class="icon"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg> </RouterLink
      ></el-menu-item>
      <el-menu-item index="2">
        <el-input
          v-model.trim="search.input"
          placeholder="Searching"
          :prefix-icon="Search"
          size="large"
          v-foucs
      /></el-menu-item>
      <el-menu-item index="3" class="signIn"
        ><RouterLink
          :to="{
            path: '/signin',
          }"
          ><span>Sign in</span></RouterLink
        ></el-menu-item
      ><el-menu-item index="4" class="signUp"
        ><RouterLink
          :to="{
            path: '/signin',
          }"
          ><span>Sign up</span></RouterLink
        ></el-menu-item
      >
    </el-menu>
    <!-- <div class="leftSide">
      <RouterLink :to="{ path: '/' }">
        <svg
          height="40"
          viewBox="0 0 16 16"
          version="1.1"
          width="40"
          class="icon"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </RouterLink>

      <el-input
        v-model.trim="search.input"
        placeholder="Searching"
        :prefix-icon="Search"
        size="large"
        v-foucs
      />
    </div>
    <div class="rightSide">
      <RouterLink
        :to="{
          path: '/signin',
        }"
        ><span>Sign in</span></RouterLink
      >
      <RouterLink
        :to="{
          path: '/signin',
        }"
        ><span>Sign up</span></RouterLink
      >
      <RouterLink
        :to="{
          path: `/${user.username}`,
        }"
      >
        <el-avatar :src="user.avatar">user</el-avatar>
      </RouterLink>
    </div> -->
  </el-header>
</template>
<style scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #010409;
}
.el-menu {
  width: 100%;
  align-items: center;
  --el-menu-bg-color: #010409;
  --el-menu-text-color: white;
  --el-menu-border-color: #010409;
  --el-menu-hover-text-color: white;
}
.el-menu-item:first-child {
  width: 50px;
}
.icon {
  color: white;
  fill: currentColor;
  margin: 10px 0;
}
.el-header .el-input {
  width: 450px;
  padding: 0 10px;
  background-color: #161b22;
  --el-input-bg-color: #161b22;
  --el-input-text-color: white;
  --el-text-color-placeholder: white;
}
.el-menu--horizontal > .el-menu-item.signIn {
  margin-left: auto;
  width: auto;
}
.signIn a,
.signUp a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
  transition: 0.4s;
}
.signIn a:hover,
.signUp a:hover {
  opacity: 0.75;
}
/* .rightSide .el-avatar {
  margin-right: 10px;
} */
</style>
