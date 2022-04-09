import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        avatar: "",
        name: "",
        userName: "",
        location: "",
        input: "",
        repos: [],
    }),
    getters: {
        sortReops(state) {
            return state.repos.sort((a, b) => {
                const newTime = new Date(a.pushed_at);
                const lastTime = new Date(b.pushed_at);
                return lastTime.getTime() - newTime.getTime();
            });
        },
    },
    actions: {
        async getUser() {
            await axios("https://api.github.com/users/mm7246591").then((res) => {
                this.avatar = res.data.avatar_url;
                this.name = res.data.name;
                this.userName = res.data.login;
                this.location = res.data.location;
            });
        },
        async getRepos() {
            await axios(`https://api.github.com/users/mm7246591/repos`).then(
                (res) => {
                    // timeEvent
                    this.repos = [];
                    const now = new Date();
                    for (let i of res.data) {
                        const time = new Date(i.pushed_at);
                        const year = time.getFullYear();
                        const month = time.getMonth();
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
                        this.repos.push(i);
                    }
                }
            );
        },
    },
});