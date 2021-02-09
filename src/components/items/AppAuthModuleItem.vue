<template>
    <div class="auth-module-item">
        <div class="layout-table">
            <div class="layout-col avatar-col">
                <app-avatar class="avatar-m avatar-dubbed" :avatar="avatar"></app-avatar>
            </div>
            <div class="layout-col content-col">
                <span>
                    <p><slot name="title"></slot></p>
                    <p><slot name="content"></slot></p>
                </span>
            </div>
            <div class="layout-col action-col" id="module-action-desktop">
                <slot name="action"></slot>
            </div>
        </div>
        <div id="module-action-mobile">
            <slot name="action"></slot>
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
            return this.$store.state.avatarBaseUrl + this.avatar
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.auth-module-item {
    background-color: $colorPrimaryDarker;
    padding: $boxPad;
    margin: $windowPad 0 0;
    border-radius: $borderRadNormal;

    img {
        border-radius: $borderRadNormal;
    }

    p {
        line-height: 1.4em;

        &:first-of-type {
            text-transform: uppercase;
            font-size: 0.7em;
            opacity: 0.5;
        }

        &:last-of-type {
            font-size: 0.9em;
            font-weight: 500;
        }
    }

    #module-action-mobile {
        display: none;
    }

    .layout-col {
        display: table-cell;
        vertical-align: middle;
        text-align: left;

        &.avatar-col, 
        &.action-col {
            padding: 0;
            width: 1%;
            white-space: nowrap;
        }

        &.content-col {
            padding: 0 0.8em;
        }
        &.action-col {
            text-align: right;
        }
    }
}

@media screen and (max-width: 540px) {
    #module-action-desktop {
        display: none;
    }

    #module-action-mobile {
        display: block !important;
        margin-top: $boxPad;
        
        button {
            width: 100%;
            margin: 0;
            text-align: center;
        }
    }
}
</style>