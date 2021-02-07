<template>
    <div class="avatar-container">
        <span v-if="hasText"><slot></slot></span>
        <img :src="avatarUrl">
    </div>
</template>

<script>
export default {
    props: {
        avatarHash: String
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

<style lang="scss" scoped>
.avatar-container {
    display: inline-block;
    vertical-align: middle;
    height: 24px;

    span {
        display: none;
        vertical-align: middle;
    }

    img {
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        min-width: 24px;
        border-radius: 50%;
        margin-left: 0.5em;
    }
}


@media screen and (max-width: 540px) {
    .avatar-container {
        span {
            display: none !important;
        }
    }
}
</style>

<style lang="scss">
.avatar-container {
    &.avatar-s {
        height: 24px;
    }
    &.avatar-m {
        height: 38px;

        span {
            display: inline;
        }

        img {
            min-width: 38px;
        }
    }
    &.avatar-l {
        height: 50px;

        span {
            display: inline;
            font-size: 1.2em;
        }

        img {
            min-width: 50px;
            margin-left: 0.7em;
        }
    }
    &.avatar-xl {
        height: 64px;

        span {
            display: inline;
            font-size: 1.6em;
            font-weight: 800;
        }

        img {
            min-width: 64px;
            margin-left: 1em;
        }
    }
}
</style>