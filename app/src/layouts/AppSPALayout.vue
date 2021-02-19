<template>
    <div class="layout-spa">
        <app-header-view></app-header-view>
        <router-view custom v-slot="{Component}">
            <transition name="anim_state_change" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<script lang="js">
import AppHeaderView from "@/views/shared/AppHeaderView.vue"

export default {
    components: {
        AppHeaderView
    }
}
</script>