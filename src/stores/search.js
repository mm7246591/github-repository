import { defineStore } from "pinia";

export const useSearchStore = defineStore({
    id: "search",
    state: () => ({
        avatar: "",
        name: "",
        username: "",
        location: "",
        userSearch: "",
        repoSearch: "",
        users: [],
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
    actions: {},
});