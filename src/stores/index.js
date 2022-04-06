import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        avatar: "",
        username: "",
    }),
    getters: {},
    actions: {
        async getUser() {
            await axios("https://api.github.com/users/mm7246591").then((res) => {
                this.avatar = res.data.avatar_url;
                this.username = res.data.login;
            });
        },
    },
});

export const useSearchStore = defineStore({
    id: "search",
    state: () => ({
        input: "",
    }),
    getters: {},
    actions: {
        getUsers() {
            axios("https://api.github.com/users").then((res) => {
                console.log(res);
            });
        },
    },
});