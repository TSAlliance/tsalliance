<template>
    <app-spa-layout></app-spa-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSpaLayout from "@/layouts/AppSPALayout.vue"

export default defineComponent({
    components: {
        AppSpaLayout
    }
})
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";


</style>
