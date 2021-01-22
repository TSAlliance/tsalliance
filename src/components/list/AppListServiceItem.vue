<template>
    <div class="service-item-wrapper" @click="openServiceUrl">
        <div class="service-background" v-if="service.background" :style="'background-image: url('+service.background+');'"></div>
        <div class="service-name">
            <p><img v-if="service.icon" :src="service.icon" :alt="service.name+'Logo'"> {{ service.name }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        service: {
            type: Object,
            default: () => {return {}}
        }
    },
    methods: {
        openServiceUrl() {
            window.open(this.service.url, "_blank")
        }
    }
})
</script>