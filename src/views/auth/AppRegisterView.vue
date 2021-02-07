<template>
    <div class="form-wrapper">
        <div class="form-header">
            <h4>Neues Konto anlegen</h4>
            <p>Bevor du loslegen kannst, benötigst du ein Konto.</p>
        </div>
        <div class="form-content">
            Inhalt folgt...
        </div>
        <div class="form-footer">
            <p>Du hast ein Konto? <router-link custom v-slot="{navigate}" :to="{name: 'authAction', params: { action: 'login' }}"><a @click="navigate">Jetzt anmelden</a></router-link></p>
        </div>
    </div>
</template>

<script lang="js">
import loaderData from '@/assets/animated/loader_light.json'
import { required } from '@vuelidate/validators'

export default {
    data() {
        return {
            username: "",
            password: "",
            error: undefined,
            module: undefined,
            loading: true,
            loaderData
        }
    },
    computed: {
        shouldRedirect() {
            return !!this.$route.query.redirect
        },
        formReady() {
            if(this.shouldRedirect) {
                return !!this.module && !this.loading
            } else {
                return !this.loading
            }
        }
    },
    methods: {
        cancel() {
            this.module = undefined
            this.loading = true
            this.$router.go(-1)
        },
        submitOnEnter(event) {
            if(event.isComposing || event.keyCode === 229) {
                return
            }

            if(event.keyCode === 13){
                document.getElementById('btn-submit').click()
            }
        },
        submit(event, done) {
            // Validate form
            this.$v.$touch()
            this.error = undefined

            // Abort if errors
            if(this.$v.$error) {
                done()
                return
            }

            setTimeout(() => {
                this.$account.signInWithCredentials(this.$v.username.$model, this.$v.password.$model).then((response) => {
                    if(response.code == 200) {
                        if(this.shouldRedirect) {
                            const url = this.module.redirectUrl+"?token="+response.token
                            window.location.href = url
                        } else {
                            this.$router.push({name: 'home'})
                        }
                    } else {
                        this.error = response.message
                    }
                }).finally(() => {
                    done()
                })
            }, 300)
        }
    },
    validations() {
        return {
            username: {
                required
            },
            password: {
                required
            }
        }
    },
    mounted() {
        if(this.shouldRedirect) {
            // Request module by app id
            const moduleID = this.$route.query.redirect
            this.$module.find(moduleID).then((result) => {
                if(result.code == 200) {
                    this.module = result.data
                }
            }).finally(() => {
                this.loading = false
            })
        } else {
            this.loading = false
            this.module = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.content-container {
    padding: $windowPad;
}
</style>