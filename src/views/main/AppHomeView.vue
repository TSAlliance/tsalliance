<template>
    <section id="landing-title" class="landing-section">

        <div class="content-container title">
            <h2>Welcome{{ $store.state.account.isLoggedIn ? ", " + $store.state.account.name + "," : "" }} at</h2>
            <h1>TSAlliance</h1>
            <div class="join-section" v-if="!$store.state.account.isLoggedIn">
                <button class="btn btn-primary btn-l btn-light" @click="$router.push({name: 'authIndex'})">Jetzt beitreten</button>
            </div>
        </div>

        <div class="content-container nopad services-row">
            <app-horizontal-list >
                <app-service-avatar v-for="service in services" :key="service.name" :service="service"></app-service-avatar>
            </app-horizontal-list>
        </div>

        <app-footer></app-footer>
    </section>
</template>

<script lang="js">
import services from "@/config/services.js"

import AppHorizontalList from '@/components/list/AppHorizontalList.vue'
import AppServiceAvatar from '@/components/items/AppServiceItem.vue'
import AppFooter from '@/views/shared/AppFooterView.vue'

export default {
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
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

section#landing-title {
    position: relative;
    text-align: center;

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
        transform: translate(-50%,-110%);

        .join-section {
            margin-top: 2.5em;
            text-align: center;
        }
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
        top: 50% !important;

        .join-section {
            font-size: 1.2em;
            margin-top: 2.5em;
        }
    }
}

@media screen and (max-width: 540px) {
    section#landing-title .title {
        font-size: 0.55em;
        top: 50% !important;

        .join-section {
            font-size: 1.5em !important;
            margin-top: 1.5em !important;
        }
    }
}
@media screen and (max-width: 480px) {
    section#landing-title .title {
        font-size: 0.45em;
        top: 50% !important;

        .join-section {
            font-size: 1.4em !important;
            margin-top: 1.5em !important;
        }
    }
}
</style>