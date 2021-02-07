<template>
    <section class="landing-section">
        <div class="content-container auth-container">
            <transition name="anim_state_change" mode="out-in">
                <component :is="currentAction"></component>
            </transition>
        </div>
    </section>
</template>

<script lang="js">
import AppLoginView from '@/views/auth/AppLoginView.vue'
import AppRegisterView from '@/views/auth/AppRegisterView.vue'

export default {
    data() {
        return {
            action: this.$route.params.action
        }
    },
    components: {
        AppLoginView,
        AppRegisterView
    },
    computed: {
        currentAction() {
            if(this.action == 'login') {
                return AppLoginView
            } else if(this.action == 'register') {
                return AppRegisterView
            } else {
                return null
            }
        },
        shouldRedirect() {
            return !!this.$route.query.redirect
        }
    },
    methods: {
        checkActionAvailable() {
            if(this.$route.name == 'authAction' || this.$route.name == 'authAction') {
                if(this.action != 'login' && this.action != 'register') {
                    this.$router.push({name: 'authAction', params: { action: 'login' }})
                }
            }
        }
    },
    watch: {
        '$route'(val) {
            this.action = val.params?.action
        },
        action() {
            this.checkActionAvailable()
        }
    },
    mounted() {
        if(this.$store.state.account.isLoggedIn && !this.shouldRedirect) {
            this.$router.push({ name: 'home' })
        }

        this.checkActionAvailable()
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

section {
    overflow-y: scroll;
}

.auth-container {
    display: flex;
    justify-items: center;
    align-items: center;
    height: 100%;
}
</style>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/elements/forms.scss";

.form-wrapper {
    display: block;
    width: 600px;
    padding: $windowPad;
    border-radius: $borderRadNormal;
    text-align: center;
    background-color: $colorPrimaryDark;
    box-shadow: $shadowForm;

    .form-header {
        display: block;

        h1,h2,h3,h4,h5,h6 {
            font-family: 'Whitney', 'Poppins', sans-serif;
        }
    }
    .form-content {
        display: block;
        padding: $windowPad 0;
        min-height: 200px;
        text-align: left;
    }
    .form-footer {
        display: block;
    }

    .form-message {
        margin: $windowPad 0 0;
    }
    .form-loader {
        margin: $windowPad auto;
    }

    .form-redirect-module {
        background-color: $colorPrimaryDarker;
        padding: $boxPad;
        margin: $windowPad 0 0;
        border-radius: $borderRadNormal;

        img {
            border-radius: $borderRadNormal;
        }

        p {
            &:first-of-type {
                text-transform: uppercase;
                font-size: 0.8em;
                opacity: 0.5;
            }
            &:last-of-type {
                font-size: 1em;
                font-weight: 500;
            }
        }

        .layout-col {
            float: left;
            text-align: left;
            vertical-align: middle;
            padding-left: 0.8em;

            &:first-of-type {
                padding-left: 0;
            }

            &:last-of-type {
                text-align: right;
                float: right;
                width: 150px;
            }
        }
    }
}

@media screen and (max-width: 540px) {
    .form-wrapper {
        width: 100%;
        padding: 1.5em;
    }

    .form-redirect-module {
        .action-col {
            display: block !important;
            width: 100% !important;
            margin-top: $boxPad;
            padding: 0 !important;

            button {
                width: 100%;
                margin: 0;
                text-align: center;
            }
        }
    }
}
</style>