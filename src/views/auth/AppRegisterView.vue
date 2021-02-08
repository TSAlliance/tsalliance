<template>
    <div class="form-wrapper">
        <div class="form-header">
            <h4>Neues Konto anlegen</h4>
            <p>Bevor du loslegen kannst, benötigst du ein Konto.</p>
        </div>

        <div class="form-message" v-if="error">
            <div class="message-box message-error" v-if="error">
                {{ error }}
            </div>
        </div>

        <div class="form-content">
            <div :class="{ 'form-group': true, 'error': vuelidate.invite.$error }">
                <label for="input_invite">Einladungscode</label>
                <input id="input_invite" type="text" class="editmode" v-model="vuelidate.invite.$model" @input="vuelidate.invite.$touch()" placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX">

                <ul class="error-section">
                    <li v-for="(error, index) of vuelidate.invite.$errors.filter((el) => { if(el.$message != '') return el })"
                        :key="index">{{ error.$message }}</li>
                    <li v-if="vuelidate.invite.$errors.filter((el) => { if(el.$validator == 'isUUID') return el }).length > 0">
                        Ungültiger Einladungscode</li>
                </ul>
            </div>
            <hr>

            <div :class="{ 'form-group': true, 'error': vuelidate.email.$error }">
                <label for="input_email">E-Mail Adresse</label>
                <input id="input_email" type="email" class="editmode" v-model="vuelidate.email.$model"
                    @input="vuelidate.email.$touch()">

                <ul class="error-section">
                    <li v-for="(error, index) of vuelidate.email.$errors" :key="index">{{ error.$message }}</li>
                </ul>
            </div>
            <div :class="{ 'form-group': true, 'error': vuelidate.username.$error }">
                <label for="input_username">Benutzername</label>
                <input id="input_username" type="text" class="editmode" v-model="vuelidate.username.$model"
                    @input="vuelidate.username.$touch()">

                <ul class="error-section">
                    <li v-for="(error, index) of vuelidate.username.$errors" :key="index">{{ error.$message }}</li>
                </ul>
            </div>
            <div :class="{ 'form-group': true, 'error': vuelidate.password.$error }">
                <label for="input_password">Passwort</label>
                <input id="input_password" type="password" class="editmode" v-model="vuelidate.password.$model"
                    @input="vuelidate.password.$touch()">

                <ul class="error-section">
                    <li v-for="(error, index) of vuelidate.password.$errors.filter((el) => { if(el.$message != '') return el })"
                        :key="index">{{ error.$message }}</li>
                    <li
                        v-if="vuelidate.password.$errors.filter((el) => { if(el.$validator == 'containsUppercase') return el }).length > 0">
                        Must at least contain 1 uppercase letter</li>
                    <li
                        v-if="vuelidate.password.$errors.filter((el) => { if(el.$validator == 'containsLowercase') return el }).length > 0">
                        Must at least contain 1 lowercase letter</li>
                    <li
                        v-if="vuelidate.password.$errors.filter((el) => { if(el.$validator == 'containsNumber') return el }).length > 0">
                        Must at least contain 1 number</li>
                    <li
                        v-if="vuelidate.password.$errors.filter((el) => { if(el.$validator == 'containsSpecial') return el }).length > 0">
                        Must at least contain 1 special letter</li>
                </ul>
            </div>
            <hr>
            <div class="form-group">
                <app-button class="btn btn-full btn-primary btn-m btn-text-center" @clicked="submit">Konto anlegen
                </app-button>
            </div>
        </div>
        <div class="form-footer">
            <p><router-link custom v-slot="{navigate}" :to="{name: 'authAction', params: { action: 'login' }}"><a @click="navigate">Du hast ein Konto?</a></router-link></p>
        </div>
    </div>
</template>

<script lang="js">
import useVuelidate from '@vuelidate/core';
import { TrustedError } from '@/models/api';

import { required, minLength, email, maxLength, alphaNum } from '@vuelidate/validators'
import { containsUppercase, containsLowercase, containsNumber, containsSpecial, isUUID } from '@/utils/validators.js'

export default {
    setup() {
        return { vuelidate: useVuelidate() }
    },
    data() {
        return {
            username: "",
            password: "",
            email: "",
            invite: this.$route.query?.invite || "",
            error: undefined
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
        setupInviteCode() {
            let query = Object.assign({}, this.$route.query)
            this.invite = query.invite || ""
            delete query.invite
            this.$router.replace({query})
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
            this.vuelidate.$touch()
            this.error = undefined

            // Abort if errors
            if(this.vuelidate.$error) {
                done()
                return
            }

            setTimeout(() => {
                this.$account.registerAccount(this.vuelidate.username.$model, this.vuelidate.password.$model, this.vuelidate.email.$model, this.vuelidate.invite.$model).then((response) => {
                    if(response instanceof TrustedError) {
                        this.error = response.message
                    } else {
                        setTimeout(() => {
                            this.$router.push({name: 'authAction', params: {action: 'login'}})
                        }, 100)
                    }
                }).finally(() => {
                    done()
                })
            }, 300)
        }
    },
    validations() {
        return {
            invite: {
                required,
                isUUID
            },
            email: {
                email,
                required
            },
            username: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(16),
                alphaNum
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(32),
                containsUppercase,
                containsLowercase,
                containsNumber,
                containsSpecial
            }
        }
    },
    mounted() {
        this.setupInviteCode()
    }
}
</script>