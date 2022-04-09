import { defineStore } from "pinia";

export const useSearchStore = defineStore({
    id: "search",
    state: () => ({
        input: "",
        users: [],
    }),
    getters: {},
    actions: {},
});