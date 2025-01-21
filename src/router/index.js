import ComentariosView from "@/views/Comentarios/ComentariosView.vue";
import VistaComentarioView from "@/views/Comentarios/VistaComentarioView.vue";
import HomeView from "@/views/Home/HomeView.vue";
import TestView from "@/views/TestView/TestView.vue";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {path: "/", name: "Home", component: HomeView, props: true},
    {path: "/comentarios", name: "comentarios", component: ComentariosView, props: true},
    {path: "/comentario", name: "comentario", component: VistaComentarioView, props: true},
    {path: "/reservaciones", name: "reservacion", component: TestView, props: true}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;