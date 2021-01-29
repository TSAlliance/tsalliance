import { RouteRecordRaw } from 'vue-router'
import AppHomeView from '@/views/main/AppHomeView.vue'

const routes: Array<RouteRecordRaw> = [
     { name: "home", path: "/", component: AppHomeView }
]
export default routes;