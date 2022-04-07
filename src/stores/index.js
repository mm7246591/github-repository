import axios from "axios";
import { defineStore } from "pinia";

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