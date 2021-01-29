<template>
    <div class="layout-spa">
        <app-header-view></app-header-view>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppHeaderView from "@/views/shared/AppHeaderView.vue"

export default defineComponent({
    components: {
        AppHeaderView
    }
})
</script>