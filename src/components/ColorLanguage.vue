<script setup>
import { onMounted, ref } from "vue";
import colorData from "../assets/colors.json";
const props = defineProps({
  language: String,
});
const colors = ref([]);
onMounted(async () => {
  await getcolorLanguage();
});
const getcolorLanguage = async () => {
  colors.value = Object.entries(colorData).filter(
    (color) => color[0] === props.language
  );
};
</script>
<template>
  <span v-for="color of colors" :key="color[0]">
    <span
      class="colorLanguage"
      :style="{
        backgroundColor: `#${color[1]}`,
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
