<template>
    <div class="avatar-changeable-container">
        <app-avatar :avatar="avatar"></app-avatar>

        <div class="upload-overlay">
            <p>Ändern</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        avatar: String
    },
    computed: {
        avatarUrl() {
            return this.$store.state.avatarBaseUrl + this.avatarHash
        },
        hasText() {
            return !!this.$slots.default
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.avatar-changeable-container {
    position: relative;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;

    .upload-overlay {
        position: absolute;
        display: flex;
        align-items: center;
        justify-items: center;
        top: 50%;
        left: 50%;
        width: 115%;
        height: 115%;
        opacity: 0;
        transform: translate(-50%,-50%);

        background-color: rgba(0, 0, 0, 0.6);
        transition: all $animSpeedFast*1s $cubicNorm;

        &::selection {
            background: transparent;
        }
    }

    &:hover {
        .upload-overlay {
            opacity: 1;
        }
    }

    &:active {
        .upload-overlay {
            background-color: rgba(0, 0, 0, 0.7);
            transform: translate(-50%,-50%) scale(0.92);
        }
    }
}


@media screen and (max-width: 540px) {
    
}
</style>