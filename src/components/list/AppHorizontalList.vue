<template>
    <div class="ts-horizontal-list-wrapper">
        <div class="ts-horizontal-list-container">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.ts-horizontal-list-wrapper {
    display: block;
    white-space: nowrap;
    text-align: center;
    max-width: 100%;
    overflow: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>