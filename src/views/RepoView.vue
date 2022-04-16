<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { DoughnutChart, LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import Header from "../components/Header.vue";
import { useRepoStore } from "../stores/repo";
Chart.register(...registerables);
const props = defineProps({
  username: String,
  repo: String,
});
const repo = useRepoStore();
console.log(props.username, props.repo);
onMounted(async () => {
  await getRepo();
  await getLanguages();
  await getcolorLanguage();
  await getRecentAvtive();
});
const getRepo = async () => {
  await axios(
    `https://api.github.com/repos/${props.username}/${props.repo}`
  ).then((res) => {
    console.log(res.data);
  });
};
const getLanguages = async () => {
  await axios(
    `https://api.github.com/repos/${props.username}/${props.repo}/languages`
  ).then((res) => {
    const sum = Object.values(res.data).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    languageData.labels = Object.keys(res.data);
    for (let i of Object.values(res.data)) {
      languageData.datasets[0].data.push(Math.round((i / sum) * 10000) / 100.0);
    }
  });
};
const getcolorLanguage = async () => {
  await axios.get("/static/colors.json").then((res) => {
    for (let i of languageData.labels) {
      languageData.datasets[0].backgroundColor.push(
        Object.entries(res.data)
          .filter((color) => color[0] === i)
          .map((color) => color[1])
      );
    }
  });
};
const languageData = reactive({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});
const languageoptions = reactive({
  responsive: true,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 16,
        },
        color: "white",
      },
      // display: false,
    },
  },
  hover: { mode: null },
});
const getRecentAvtive = async () => {
  await axios
    .get(`https://api.github.com/repos/${props.username}/${props.repo}/events`)
    .then((res) => {
      res.data.sort((a, b) => a.id - b.id);
      for (let i of res.data) {
        const time = new Date(i.created_at);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate();
        const active = `${year}/${month}/${date}`;
        activeData.labels.push(active);
        activeData.datasets[0].data.push(i.payload.size);
      }
    });
};

const activeData = reactive({
  labels: [],
  datasets: [
    {
      label: "Recently active",
      data: [],
      fill: false,
      borderColor: "#26a641",
      Color: "white",
      tension: 0.1,
    },
  ],
});
const activeoptions = reactive({
  responsive: true,
  event: [],
  plugins: {
    legend: {
      labels: {
        font: {
          size: 16,
        },
        color: "white",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#0d1117",
        font: {
          size: 16,
        },
        padding: 20,
      },
    },
    y: {
      ticks: {
        color: "#0d1117",
        font: {
          size: 16,
        },
        backdropPadding: {
          x: 20,
          y: 20,
        },
      },
    },
  },
  hover: { mode: null },
});
</script>
<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-main>
      <div class="chart">
        <DoughnutChart :chartData="languageData" :options="languageoptions" />
        <LineChart :chartData="activeData" :options="activeoptions" />
      </div>
      <div class="about"><span>About</span></div>
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-weight: 500;
  line-height: 1.2;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.chart {
  display: flex;
}
.about {
  width: 300px;
  color: #c1c1c1;
}
</style>
