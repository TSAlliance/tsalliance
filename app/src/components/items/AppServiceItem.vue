<template>
    <div class="service-item" @click="openServiceUrl">
        <img :src="service?.banner" :alt="service?.name">
    </div>
</template>

<script lang="js">
export default {
    props: {
        service: Object
    },
    methods: {
        openServiceUrl() {
            window.open(this.service?.url, "_blank")
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.service-item {
    display: inline-block;
    width: 90px;
    height: 90px;
    border-radius: $borderRadNormal;
    margin: 1em;
    overflow: hidden;
    transition: all $animSpeedNormal*1s $cubicNorm;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.96);

    }

    img {
        height: 100%;
    }
}

@media screen and (max-width: 950px) {
    .service-item {
        width: 80px;
        height: 80px;
        margin: 0.8em;
    }
}
@media screen and (max-width: 580px) {
    .service-item {
        width: 65px;
        height: 65px;
        margin: 0.5em;
    }
}
</style>