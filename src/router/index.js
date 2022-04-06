import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import SigninView from "../views/SigninView.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "HomeView",
            component: HomeView,
        },
        {
            path: "/signin",
            name: "SigninView",
            component: SigninView,
        },
        {
            path: "/:name",
            name: "AdminView",
            component: AdminView,
            props: true,
        },
    ],
});

export default router;