<template>
    <div class="header-wrapper">
        <img id="desktop-logo" src="@/assets/images/branding/ts_alliance_logo.svg" alt="Alliance Logo">
        <img id="mobile-logo" src="@/assets/images/branding/ts_logo.svg" alt="Alliance Logo">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.header-wrapper {
    display: block;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    padding: $windowPad;

    img {
        display: inline-block;
        height: 50px;
        vertical-align: middle;

        &#mobile-logo {
            display: none;
            height: 40px;
        }
    }
}

@media screen and (max-width: 950px) {
    .header-wrapper {
        padding: $boxPad;

        #desktop-logo {
            display: none;
        }
        #mobile-logo {
            display: inline-block !important;
        }
    }
}
</style>