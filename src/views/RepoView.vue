<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { DoughnutChart, LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import Header from "../components/Header.vue";
import { useUserStore } from "../stores/user";
Chart.register(...registerables);
const props = defineProps({
  username: String,
  repo: String,
});
const user = useUserStore();
const description = ref("");
const userName = ref(`https://github.com/${props.username}`);
const userRepo = ref(`https://github.com/${props.username}/${props.repo}`);
const readMe = ref(`https://github.com/${props.username}/${props.repo}#readme`);
const starts = ref(
  `https://github.com/${props.username}/${props.repo}/stargazers`
);
const watching = ref(
  `https://github.com/${props.username}/${props.repo}/watchers`
);
const forks = ref(
  `https://github.com/${props.username}/${props.repo}/network/members`
);
const releases = ref(
  `https://github.com/${props.username}/${props.repo}/releases`
);
const packages = ref(
  `https://github.com/${props.username}?tab=packages&repo_name=${props.repo}`
);
const contributors = ref(
  `https://github.com/${props.username}/${props.repo}/graphs/contributors`
);
const forksCount = ref(null);
const forkUser = ref([]);
console.log(props.username, props.repo);
onMounted(async () => {
  await getRepo();
  await getLanguages();
  await getcolorLanguage();
  await getRecentAvtive();
  await getContributors();
});
const getRepo = async () => {
  await axios(
    `https://api.github.com/repos/${props.username}/${props.repo}`
  ).then((res) => {
    description.value = res.data.description;
    forksCount.value = res.data.forks_count;
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
        let activity = 0;
        const time = new Date(i.created_at);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate();
        const active = `${year}/${month}/${date}`;
        activeData.labels.push(active);
        if (active) {
          activity = activity + 1;
        }
        activeData.datasets[0].data.push(activity);
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
        color: "#c9d1d9",
        font: {
          size: 16,
        },
        padding: 20,
      },
    },
    y: {
      min: 0,
      max: 10,
      ticks: {
        color: "#c9d1d9",
        font: {
          size: 16,
        },
      },
    },
  },
  hover: { mode: null },
});
const getContributors = async () => {
  await axios(
    `https://api.github.com/repos/${props.username}/${props.repo}/forks`
  ).then((res) => {
    forkUser.value = res.data;
    console.log(forkUser.value);
  });
};
</script>
<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-main>
      <div class="title">
        <a :href="userName">{{ props.username }}</a>
        <span>/</span>
        <a :href="userRepo">{{ props.repo }}</a>
        <div class="chart">
          <LineChart :chartData="activeData" :options="activeoptions" />
        </div>
      </div>
      <div class="about">
        <h3>About</h3>
        <span v-if="description">{{ description }}</span>
        <span v-else>No description, website, or topics provided.</span>
        <div class="icon">
          <a :href="readMe">
            <svg width="16" height="16" viewBox="0 0 16 16" version="1.1">
              <path
                fill-rule="evenodd"
                d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
              ></path>
            </svg>
            Readme</a
          >
        </div>
        <div class="icon">
          <a :href="starts">
            <svg width="16" height="16" viewBox="0 0 16 16" version="1.1">
              <path
                fill-rule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              ></path>
            </svg>
            Starts</a
          >
        </div>
        <div class="icon">
          <a :href="watching">
            <svg width="16" height="16" viewBox="0 0 16 16" version="1.1">
              <path
                fill-rule="evenodd"
                d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
              ></path>
            </svg>
            watching</a
          >
        </div>
        <div class="icon">
          <a :href="forks">
            <svg width="16" height="16" viewBox="0 0 16 16" version="1.1">
              <path
                fill-rule="evenodd"
                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
              ></path>
            </svg>
            forks</a
          >
        </div>
        <div class="releases">
          <h3><a :href="releases">Releases</a></h3>
          <span>No releases published</span>
        </div>
        <div class="packages">
          <h3><a :href="packages">Packages</a></h3>
          <span>No packages published</span>
        </div>
        <div class="contributors" v-if="forksCount">
          <div class="text">
            <h3>
              <a :href="contributors">Contributors</a>
              <span>{{ forksCount }}</span>
            </h3>
          </div>
          <div class="personal">
            <el-avatar :src="user.avatar" />
            <span class="username">{{ user.username }}</span>
          </div>
          <div class="user" v-for="user of forkUser" :key="user.node_id">
            <el-avatar :src="user.owner.avatar_url" />
            <span class="username">{{ user.owner.login }}</span>
          </div>
        </div>
        <div class="chart">
          <DoughnutChart :chartData="languageData" :options="languageoptions" />
        </div>
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
  height: auto;
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
.title {
  text-align: center;
  width: 60%;
  margin: 0 20px;
}
.title a {
  color: #58a6ff;
  text-decoration: none;
  font-size: 20px;
  margin: 0 5px;
  transition: 0.3s;
}
.title a:hover {
  text-decoration: underline;
}
.title span {
  font-size: 20px;
  color: #8b949e;
}
.title .chart {
  margin-top: 30px;
}
.about {
  width: 40%;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  color: #c1c1c1;
}
.about span {
  font-size: 16px;
  margin-bottom: 10px;
}
.about .icon {
  margin: 5px 0;
}
.icon a {
  color: #8b949e;
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s;
}
.icon a:hover {
  color: #58a6ff;
}
.icon svg {
  color: #c1c1c1;
  fill: currentColor;
  margin-right: 5px;
}
.releases {
  display: flex;
  flex-direction: column;
}
.releases a,
.packages a,
.contributors a {
  text-decoration: none;
  color: #c1c1c1;
  transition: 0.3s;
}
.releases a:hover,
.packages a:hover,
.contributors a:hover {
  color: #58a6ff;
}
.releases span,
.packages span,
.contributors span {
  color: #8b949e;
}
.contributors {
  display: flex;
  flex-direction: column;
}
.contributors .text span {
  font-size: 16px;
  font-weight: 500;
  margin: 0 5px;
  padding: 0 6px;
  color: #c9d1d9;
  background-color: rgba(110, 118, 129, 0.4);
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 2em;
}
.personal,
.user {
  display: flex;
  align-items: center;
}
.username {
  color: #c9d1d9 !important;
  margin: 10px;
}
.chart {
  margin-top: 20px;
}
@media screen and (max-width: 768px) {
  .el-main {
    height: 100%;
    flex-direction: column;
  }
  .title {
    width: 100%;
    margin: 0;
  }
  .about {
    width: 100%;
    margin: 0;
  }
}
</style>
