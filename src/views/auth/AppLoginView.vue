<template>
    <div class="form-wrapper">
        <div class="form-header">
            <h4>Willkommen zurück!</h4>
            <p>Bevor du loslegen kannst, melde dich bitte an.</p>
        </div>

        <div class="form-message" v-if="!loading && shouldRedirect && !module || error">
            <div class="message-box message-error" v-if="!loading && shouldRedirect && !module">
                Es liegt ein Problem mit dem Modul vor, bei welchem du dich anmelden möchtest. Bitte versuche es später erneut.
            </div>

            <div class="message-box message-error" v-if="error">
                {{ error }}
            </div>
        </div>
        
        <div class="form-content" v-if="loading || formIsReady">
            <app-loader class="form-loader" v-if="loading"></app-loader>

            <app-auth-module :avatar="module.avatar" v-if="shouldRedirect && !loading && module">
                <template #title>Anmelden bei</template>
                <template #content>{{ module?.name }}</template>
                <template #action><app-button class="btn btn-primary btn-m" @click="cancelRedirect">Abbrechen</app-button></template>
            </app-auth-module>

            <app-auth-module :avatar="$store.state.account.avatar" v-if="$store.state.account.isLoggedIn && shouldRedirect">
                <template #title>Angemeldet als</template>
                <template #content>{{ $store.state.account.name }}</template>
                <template #action><app-button class="btn btn-primary btn-m" @click="logout">Abmelden</app-button></template>
            </app-auth-module>
            
            <!-- Show form if user is logged out -->
            <div class="form-container" v-if="formIsReady && !($store.state.account.isLoggedIn && shouldRedirect)">
                <div :class="{ 'form-group': true, 'form-error': vuelidate.username.$error }">
                    <label for="input_username">Benutzername</label>
                    <input id="input_username" type="text" class="editmode" v-model="vuelidate.username.$model" @input="vuelidate.username.$touch()">

                    <ul class="error-section">
                        <li v-for="(error, index) of vuelidate.username.$errors" :key="index">{{ error.$message }}</li>
                    </ul>
                </div>

                <div :class="{ 'form-group': true, 'form-error': vuelidate.password.$error }">
                    <label for="input_password">Passwort</label>
                    <input id="input_password" type="password" class="editmode" v-model="vuelidate.password.$model" @input="vuelidate.password.$touch()" @keydown="submitOnEnter">

                    <ul class="error-section">
                        <li v-for="(error, index) of vuelidate.password.$errors" :key="index">{{ error.$message }}</li>
                    </ul>
                </div>
                <hr>
            </div>

            <div class="form-group">
                <app-button id="btn-submit" class="btn btn-full btn-primary btn-m btn-text-center" @clicked="submit">Anmelden</app-button>
            </div>
        </div>
        <div class="form-footer" v-if="!shouldRedirect">
            <p><router-link custom v-slot="{navigate}" :to="{name: 'authAction', params: { action: 'register' }}"><a @click="navigate">Du hast eine Einladung?</a></router-link></p>
        </div>
    </div>
</template>

<script>
import { Module } from '@/models/module';
import { TrustedError } from '@/models/api';
import { Account } from '@/models/account'

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators'
import AppAuthModule from '../../components/items/AppAuthModuleItem.vue';

export default {
  components: { AppAuthModule },
    setup() {
        return { vuelidate: useVuelidate() }
    },
    data() {
        return {
            username: "",
            password: "",
            error: undefined,
            module: undefined,
            loading: true,
            redirect: undefined
        }
    },
    computed: {
        shouldRedirect() {
            return !!this.redirect
        },
        formIsReady() {
            if(this.shouldRedirect) {
                return !!this.module && !this.loading
            } else {
                return !this.loading
            }
        }
    },
    methods: {
        setupRedirect() {
            let query = Object.assign({}, this.$route.query)
            this.redirect = query.redirect || undefined
            delete query.redirect
            //this.$router.replace({query})
        },
        cancelRedirect() {
            this.redirectToModule(false)
        },
        logout() {
            this.$account.logout()
        },
        submitOnEnter(event) {
            if(event.isComposing || event.keyCode === 229) {
                return
            }

            if(event.keyCode === 13){
                document.getElementById('btn-submit').click()
            }
        },
        redirectToModule(token){
            const url = this.module.url+"/auth?token="+token
            window.location.href = url
        },
        submit(event, done) {
            if(this.shouldRedirect && this.$store.state.account.isLoggedIn) {
                Account.verifySession().then((isVerified) => {
                    if(isVerified) {
                        this.redirectToModule(this.$store.state.account.session)
                    }
                }).finally(done)
                return
            }
            // Validate form
            this.vuelidate.$touch()
            this.error = undefined

            // Abort if errors
            if(this.vuelidate.$error) {
                done()
                return
            }

            setTimeout(() => {
                this.$account.signInWithCredentials(this.vuelidate.username.$model, this.vuelidate.password.$model, false).then((response) => {
                    if(response instanceof TrustedError) {
                        this.error = response.message
                    } else {
                        if(this.shouldRedirect) {
                            this.redirectToModule(response.data.token)
                        } else {
                            setTimeout(() => {
                                this.$router.push({name: 'home'})
                            }, 100)
                        }
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
        this.setupRedirect()

        if(this.shouldRedirect) {
            // Request module by app id
            const moduleID = this.redirect
            Module.findModule(moduleID).then((result) => {
                if(result instanceof Module) {
                    this.module = result
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