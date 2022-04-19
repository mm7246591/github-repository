<script setup>
import { onMounted, ref } from "vue";
import db from "../firebase/firebase";
import { ref as dref, onValue } from "firebase/database";
const props = defineProps({
  language: String,
});
const colors = ref([]);
onMounted(async () => {
  await getcolorLanguage();
});
const getcolorLanguage = async () => {
  const getData = dref(db);
  await onValue(getData, (data) => {
    colors.value = Object.entries(data.val()).filter(
      (color) => color[0] === props.language
    );
  });
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
