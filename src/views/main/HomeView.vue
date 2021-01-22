<template>
    <section>

        <app-divider></app-divider>

        <div class="landing-title">
            <h6>Welcome to</h6>
            <h1>TS<span>Alliance</span></h1>
        </div>

        <div class="services-container layout-table">
            <div class="layout-col">
                <h5>Our services</h5>

                <div class="services-row">
                    <app-list-service-item v-for="service in services.services" :key="service.name" :service="service"></app-list-service-item>
                </div>
            </div>

            <div class="layout-col">
                <h5>Partner</h5>

                <div class="services-row">
                    <app-list-service-item v-for="service in services.partners" :key="service.name" :service="service"></app-list-service-item>
                </div>
            </div>
        </div>
        
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppDivider from '@/views/shared/AppDividerView.vue'
import AppListServiceItem from '@/components/list/AppListServiceItem.vue'
import services from '@/config/services.ts'

export default defineComponent({
    components: {
        AppDivider,
        AppListServiceItem
    },
    data() {
        return {
            services
        }
    }
})
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/elements/lists.scss";

.landing-title {
    display: block;
    width: 100%;
    text-align: left;
    margin: 5em 0;

    h6 {
        opacity: 0.7;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    h1 {
        font-size: 5em;
        line-height: 1em;

        span {
            color: $colorAccent;
        }
    }
}
</style>