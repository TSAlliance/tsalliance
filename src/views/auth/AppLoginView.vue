<template>
    <div class="form-wrapper">
        <div class="form-header">
            <h4>Willkommen zurück!</h4>
            <p>Bevor du loslegen kannst, melde dich bitte an.</p>
        </div>
        
        <div class="form-redirect-module" v-if="shouldRedirect && !loading && module">
            <div class="layout-table">
                <div class="layout-col">
                    <img class="icon-l" :src="module.getAvatarUrl()" alt="">
                </div>
                <div class="layout-col">
                    <span>
                        <p>Anmeldung bei</p>
                        <p>{{ module?.name }}</p>
                    </span>
                </div>
                <div class="layout-col action-col">
                    <span class="cancel-button">
                        <app-button class="btn btn-primary btn-m" @click="cancelRedirect">Abbrechen</app-button>
                    </span>
                </div>
            </div>
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
            <!-- Show field if user is logged in to proceed with current account -->
            <div v-if="$store.state.account.isLoggedIn && shouldRedirect">
                <div class="form-redirect-module">
                    <div class="layout-table">
                        <div class="layout-col">
                            <app-avatar :avatarHash="$store.state.account.avatar" class="avatar-l"></app-avatar>
                        </div>
                        <div class="layout-col">
                            <span>
                                <p>Angemeldet als</p>
                                <p>{{ $store.state.account.name }}</p>
                            </span>
                        </div>
                        <div class="layout-col action-col">
                            <span class="cancel-button">
                                <app-button class="btn btn-primary btn-m" @click="logout">Abmelden</app-button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="form-group" v-if="$store.state.account.isLoggedIn">
                    <app-button id="btn-submit" class="btn btn-full btn-primary btn-m btn-text-center" @clicked="submit">Jetzt fortfahren</app-button>
                </div>
            </div>
            
            <!-- Show form if user is logged out -->
            <div class="form-container" v-else-if="formIsReady">
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
                <div class="form-group">
                    <app-button id="btn-submit" class="btn btn-full btn-primary btn-m btn-text-center" @clicked="submit">Jetzt anmelden</app-button>
                </div>
            </div>
        </div>
        <div class="form-footer">
            <p><router-link custom v-slot="{navigate}" :to="{name: 'authAction', params: { action: 'register' }}"><a @click="navigate">Du hast eine Einladung?</a></router-link></p>
        </div>
    </div>
</template>

<script>
import loaderData from '@/assets/animated/loader_light.json'
import { Module } from '@/models/module';
import { TrustedError } from '@/models/api';
import { Account } from '@/models/account'

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators'

export default {
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
            loaderData
        }
    },
    computed: {
        shouldRedirect() {
            return !!this.$route.query.redirect
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
        if(this.shouldRedirect) {
            // Request module by app id
            const moduleID = this.$route.query.redirect
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

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>