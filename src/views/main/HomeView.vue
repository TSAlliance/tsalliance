<template>
    <div class="section-container">
        <app-header></app-header>
        <section-landing></section-landing>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppHeader from '@/views/shared/AppHeaderView.vue'
import SectionLanding from '@/views/main/sections/AppLandingSection.vue'

import services from '@/config/services.ts'

export default defineComponent({
    components: {
        AppHeader,
        SectionLanding
    },
    data() {
        return {
            services
        }
    }
})
</script>