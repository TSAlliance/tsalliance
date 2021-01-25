<template>
    <section class="services-row">
        <app-horizontal-list >
            <app-service-avatar v-for="service in services" :key="service.name" :service="service"></app-service-avatar>
        </app-horizontal-list>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import services from "@/config/services.ts"

import AppHorizontalList from '@/components/list/AppHorizontalList.vue'
import AppServiceAvatar from '@/components/avatar/AppServiceAvatar.vue'

export default defineComponent({
    components:  {
        AppHorizontalList,
        AppServiceAvatar
    },
    computed: {
        services() {
            return services;
        }
    }
})
</script>

<style lang="scss" scoped>
.services-row {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%,-50%);
    display: block;
}
</style>