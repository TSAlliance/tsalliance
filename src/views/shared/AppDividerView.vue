<template>
    <div class="divider-container">
        <hr>
        <img src="@/assets/images/branding/ts_logo.svg" alt="TSAlliance Logo">
        <hr>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({

})

export default class AppDividerView extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.divider-container {
    display: block;
    width: 100%;
    padding: $windowPad 0;

    hr {
        display: inline-block;
        background-color: $colorPlaceholder;
        height: 3px;
        width: 180px;
        border-radius: 8px;
        border: none;
    }

    img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin: 0 1em;
    }
}
</style>