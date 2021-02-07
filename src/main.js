import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import formatDate from 'dateformat'

// Import vue.js plugins
import VueLottiePlayer from 'vue-lottie-player'

// Import models
import { Account } from '@/models/account.js'
import { Module } from '@/models/module'

// Import utils 
import { generateId } from '@/utils/generatorUtil'

// Import global Components
import AppLoaderComp from '@/components/loader/AppLoaderComp.vue'
import AppButtonComp from '@/components/button/AppButtonComp.vue'
import AppAvatarComp from '@/components/image/AppAvatarComp.vue'

// Initialize storage
store.commit('initialiseStore')

const app = createApp(App)

app.config.globalProperties.$env = process.env
app.config.globalProperties.$account = Account
app.config.globalProperties.$module = Module
app.config.globalProperties.$isProduction = process.env.NODE_ENV === 'production'

app.use(store)
app.use(router)

// Register Vue.js plugins
app.use(VueLottiePlayer)

// Register global components
app.component('app-button', AppButtonComp)
app.component('app-loader', AppLoaderComp)
app.component('app-avatar', AppAvatarComp)

// Register global methods
app.mixin({
    methods: {
        generateId,
        dateformat(date, format){
            return formatDate(date, format)
        }
    },
})

// Mount app
app.mount('#app')