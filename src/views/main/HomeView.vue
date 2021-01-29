<template>
    <div class="section-container">
        <app-header></app-header>
        <section-landing></section-landing>
        <app-footer></app-footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppHeader from '@/views/shared/AppHeaderView.vue'
import AppFooter from '@/views/shared/AppFooterView.vue'
import SectionLanding from '@/views/main/sections/AppLandingSection.vue'

import services from '@/config/services.ts'

export default defineComponent({
    components: {
        AppHeader,
        AppFooter,
        SectionLanding
    },
    data() {
        return {
            services
        }
    }
})
</script>