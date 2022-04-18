<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const props = defineProps({
  language: String,
});
const colors = ref([]);
onMounted(async () => {
  await getcolorLanguage();
});
const getcolorLanguage = async () => {
  await axios.get("/public/static/colors.json").then((res) => {
    colors.value = Object.entries(res.data).filter(
      (color) => color[0] === props.language
    );
  });
};
</script>
<template>
  <span v-for="color of colors" :key="color[1]">
    <span
      class="colorLanguage"
      :style="{
        backgroundColor: `${color[1]}`,
      }"
    ></span>
    <span class="text">{{ language }}</span>
  </span>
</template>

<style scoped>
.colorLanguage {
  position: absolute;
  top: 3px;
  left: -15px;
  width: 10px;
  height: 10px;
  margin: 0 15px;
  border-radius: 50%;
}
.text {
  margin: 0 15px;
}
</style>
