import AppHomeView from '@/views/main/AppHomeView.vue'
import AppSidebarLayout from "@/layouts/AppSidebarLayout.vue"

const routes = [
     { name: "home", path: "/", component: AppHomeView },

     { name: "authIndex", path: "/auth", redirect: {name: 'authAction', params: {action: 'login'}}},
     { name: "authAction", path: "/auth/:action", component: () => import("@/views/auth/AppAuthView.vue")},

     { name: "account", path: "/account", component: () => import("@/views/account/AppAccountIndexView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }},
     /*{ name: 'safety', path: '/safety', component: () => import("@/views/admin/AppSafetyView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }},
     { name: 'connections', path: '/connections', component: () => import("@/views/admin/AppConnectionsView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }},
     { name: 'connectionsAdd', path: '/connections/:app', component: () => import("@/views/admin/AppConnectionsView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }},
     { name: 'users', path: '/users', component: () => import("@/views/admin/AppUsersView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }},
     { name: 'roles', path: '/roles', component: () => import("@/views/admin/AppRolesView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }},
     { name: 'modules', path: '/modules', component: () => import("@/views/admin/AppModulesView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }},
     { name: 'invites', path: '/invites', component: () => import("@/views/admin/AppInvitesView.vue"), meta: { layout: AppSidebarLayout, requiresAuth: true }}*/
]
export default routes;