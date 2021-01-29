<template>
    <section id="landing-title" :style="'background-image: url('+require('@/assets/images/background/alliance_background.jpeg')+');'">

        <div class="content-container title">
            <h2>Welcome to the</h2>
            <h1>TSAlliance</h1>
        </div>

        <div class="content-container nopad services-row">
            <app-horizontal-list >
                <app-service-avatar v-for="service in services" :key="service.name" :service="service"></app-service-avatar>
            </app-horizontal-list>
        </div>

        <app-footer></app-footer>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import services from "@/config/services.ts"

import AppHorizontalList from '@/components/list/AppHorizontalList.vue'
import AppServiceAvatar from '@/components/items/AppServiceItem.vue'
import AppFooter from '@/views/shared/AppFooterView.vue'

export default defineComponent({
    computed: {
        services() {
            return services;
        }
    },
    components: {
        AppHorizontalList,
        AppServiceAvatar,
        AppFooter
    }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

section {
    height: 100vh;
}

section#landing-title {
    position: relative;
    text-align: center;

    background-attachment: scroll;
    background-position: center;
    background-size: cover;

    h1 {
        font-size: 6em;
        line-height: 1em;
        color: $colorPurple;
        font-weight: 800;
    }

    h2 {
        color: $colorPink;
    }

    .content-container.title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-170%);
    }
}

.services-row {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%,-50%);
    display: block;
}

@media screen and (max-width: 850px) {
    section#landing-title .title {
        font-size: 0.8em;
        top: 47.5% !important;
    }
}

@media screen and (max-width: 540px) {
    section#landing-title .title {
        font-size: 0.55em;
        top: 44.5% !important;
    }
}
@media screen and (max-width: 480px) {
    section#landing-title .title {
        font-size: 0.45em;
        top: 43.8% !important;
    }
}
</style>