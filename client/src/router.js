import { createRouter, createWebHistory } from "vue-router";
import InventoryPage from "@/Views/InventoryManager.vue";
import LoginPage from "@/Views/LoginPage.vue";
import DashboardView from "./Views/DashboardView.vue";

const routes = [
    {
        path: "/",
        name: "inventory",
        component: InventoryPage,  // This is your inventory page
    },
    {
        path: "/login",  // Hidden login page
        name: "login",
        component: LoginPage,  // This is your login page
    },
    {
        path: "/dashboard",  // Hidden dashboard page
        name: "dashboard",
        component: DashboardView,  // This is your dashboard page

    }
    // // Optionally, you can add a route for a fallback page or a 404
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "not-found",
    //     component: () => import("@/views/NotFound.vue"),
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
