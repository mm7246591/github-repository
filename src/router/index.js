import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PresonalView from "../views/PersonalView.vue";
import UserView from "../views/UserView.vue";
import RepoView from "../views/RepoView.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "HomeView",
            component: HomeView,
        },
        {
            path: "/:username",
            name: "PresonalView",
            component: PresonalView,
        },
        {
            path: "/user/:username",
            name: "UserView",
            component: UserView,
            props: true,
        },
        {
            path: "/:name/:repoName",
            name: "RepoView",
            component: RepoView,
            props: true,
        },
    ],
});

export default router;