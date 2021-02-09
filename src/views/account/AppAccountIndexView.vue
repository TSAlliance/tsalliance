<template>
    <section>
        <h3 class="title">Mein Konto</h3>
        
        <div class="section-box">
            <div class="layout-table">
                <div class="layout-col">

                    <app-avatar-changable :avatar="$store.state.account.avatar" class="avatar-xxl avatar-dubbed"></app-avatar-changable>
                    <!--<span><img class="icon icon-xs" src="@/assets/icons/upload.svg" alt=""></span>
                    
                    <img id="user_avatar" :src="$store.state.account.avatarUrl" alt="">-->
                </div>
                <div class="layout-col">
                    <div class="profile-info">
                        <h3>{{ $store.state.account.name }}</h3>
                        <p>{{ $store.state.account.uuid }}</p>
                    </div>
                </div>
            </div>

            <div class="form">
                <div class="form-group" :class="{ 'error': account.name.error }">
                    <action-input-box type="text" v-model="v.form.name.$model" @saved="input" data-field="username">
                        <template #label>Benutzername</template>
                    </action-input-box>

                    <ul class="error-section" v-if="v.form.name.$error">
                        <li v-for="(error, index) of v.form.name.$errors" :key="index">{{ error.$message }}</li>
                    </ul>
                    <ul class="error-section" v-if="account.name.error">
                        <li>{{ account.name.error }}</li>
                    </ul>
                </div>
                <div class="form-group" :class="{ 'error': account.email.error }">
                    <action-input-box type="email" v-model="v.form.email.$model" @saved="input" data-field="email">
                        <template #label>E-Mail</template>
                    </action-input-box>

                    <ul class="error-section" v-if="v.form.email.$error">
                        <li v-for="(error, index) of v.form.email.$errors" :key="index">{{ error.$message }}</li>
                    </ul>
                    <ul class="error-section" v-if="account.email.error">
                        <li>{{ account.email.error }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import store from '@/store/index'
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, alphaNum, email } from '@vuelidate/validators'
import ActionInputBox from '@/components/input/ActionInputBox.vue'
import AppAvatarChangable from '../../components/image/AppAvatarChangable.vue'

export default {
    setup() {
        return { ...setupVuelidate() }
    },
    components: {
        ActionInputBox,
        AppAvatarChangable
    },
    data() {
        return {
            account: {
                name: {
                    error: undefined
                },
                email: {
                    error: undefined
                }
            }
        }
    },
    methods: {
        input(data, done) {
            Object.keys(data).forEach((key) => {
                if(this.user[key]) this.user[key].error = undefined
            })
            done()
            /*this.$account.updateMe(data).then((result) => {
                if(result.code == 200 || result.err == 'API_NOTHING_CHANGED') {
                    done('success')
                    this.form.username = data.username
                    this.form.email = data.email
                } else {
                    done('failure')
                    Object.keys(data).forEach((key) => {
                        if(this.user[key]) this.user[key].error = result.message
                    })
                }
            })*/
        }
    }
}
/**
 * Function for creating vuelidate instance during component setup()
 */
function setupVuelidate() {
    // Create initial form (used for reset)
    const initForm = {
        name: store.state.account.name,
        email: store.state.account.email
    }
    // create reactive form object
    const form = ref(initForm)
    // Set rules
    const rules = {
        form: {
            name: { 
                required,
                alphaNum,
                minLength: minLength(6),
                maxLength: maxLength(32)
            },
            email: { 
                required,
                minLength: minLength(6),
                maxLength: maxLength(32),
                email
            }
        }
    }
    // Create and return vuelidate object
    const v = useVuelidate(rules, {form})
    return {initForm, form, v, resetForm: () => resetForm(form, initForm)}
}
function resetForm(form, initForm) {
    form = initForm
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.layout-table {
    .layout-col {
        vertical-align: middle;
        &:first-of-type {
            position: relative;
            width: 80px;
            height: 80px;
            margin-right: 1.5em;
            #user_avatar {
                width: 80px;
                height: 80px;
            }
            span {
                position: absolute;
                top: -10px;
                right: -10px;
                display: flex;
                justify-items: center;
                align-items: center;
                width: 32px;
                height: 32px;
                text-align: center;
                background-color: $colorPlaceholder;
                border: 4px solid $colorPrimary;
                border-radius: 50%;
            }
        }
        &:last-of-type {
            padding-left: 1.5em;
        }
    }
}
.section-box {
    display: inline-block;
    width: 100%;
    img {
        border-radius: $borderRadSmall;
    }
}
.profile-info {
    vertical-align: middle;
    p {
        opacity: 0.3;
        font-weight: 400;
        font-size: 0.8em;
        line-height: 0.8em;
    }
}
</style>