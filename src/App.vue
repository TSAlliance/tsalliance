<template>
    <transition name="anim_dialog" mode="out-in" appear>
        <app-splash-screen></app-splash-screen>
    </transition>
    <transition name="anim_state_change" mode="out-in">
        <component :is="getLayout" v-if="$store.state.appIsReady"></component>
    </transition>
</template>

<script>
import AppSplashScreen from '@/views/shared/AppSplashScreenView.vue'
import AppSpaLayout from "@/layouts/AppSPALayout.vue"

export default {
    components: {
        AppSpaLayout,
        AppSplashScreen
    },
    computed: {
        getLayout() {
            return this.$route.meta?.layout || AppSpaLayout;
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";


</style>
