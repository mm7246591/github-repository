<script setup>
import { RouterLink } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { onMounted } from "@vue/runtime-core";
import { useSearchStore } from "../stores/index";
import { useUserStore } from "../stores/user";
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
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#010409"
    active-text-color="#010409"
  >
    <el-menu-item index="1" class="leftSide">
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
          /></svg></RouterLink
      ><el-input
        v-model.trim="search.input"
        placeholder="Searching"
        :prefix-icon="Search"
        size="large"
        v-foucs
      />
    </el-menu-item>
    <el-menu-item index="2" class="icon"
      ><RouterLink
        :to="{
          path: `/${user.userName}`,
        }"
      >
        <el-avatar :src="user.avatar" /></RouterLink
    ></el-menu-item>
  </el-menu>
</template>
<style scoped>
.el-menu {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  --el-menu-bg-color: #010409;
  --el-menu-text-color: white;
  --el-menu-border-color: #010409;
  --el-menu-hover-text-color: white;
}

.el-header .el-input {
  width: 500px;
  padding: 0 10px;
  background-color: #161b22;
  --el-input-bg-color: #161b22;
  --el-input-text-color: white;
  --el-text-color-placeholder: white;
}
.logo {
  color: white;
  fill: currentColor;
  margin: 10px 0;
}
.el-menu--horizontal > .el-menu-item.icon {
  line-height: 40px;
}
</style>
