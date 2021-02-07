import { createStore } from 'vuex'
import config from '@/config/config.json'
import { version } from '../../package.json';

if (config.api.port == 80 || config.api.port == 443) {
    config.api.port = 0
}

const localStorageName = 'data'
const avatarBaseUrl = config.api.protocol+"://"+config.api.host + (config.api.port != 0 ? ":" + config.api.port : "") + "/avatars/"
const apiBaseUrl = config.api.protocol+"://"+config.api.host + (config.api.port != 0 ? ":" + config.api.port : "")

const dummyAccount = {
    session: undefined,
    isLoggedIn: false,
    name: undefined,
    uuid: undefined,
    role: {
        name: undefined,
        uuid: undefined
    },
    avatar: undefined,
    avatarUrl: undefined
}

const store = createStore({
    state: {
        config,
        version: version,
        avatarBaseUrl,
        apiBaseUrl,
        account: dummyAccount,
        appIsReady: false,
        appRequiresAuth: false
    },
    mutations: {
        updateAccount(state, payload) {
            if(payload == undefined) {
                state.account = dummyAccount
            } else {
                var account = {
                    ...state.account,
                    ...payload
                }
                account.avatarUrl = avatarBaseUrl + account.avatar
                state.account = account
            }
        },
        initialiseStore(state) {
            if (localStorage.getItem(localStorageName)) {
                const store = JSON.parse(localStorage.getItem(localStorageName))
                store.config = config
                store.avatarBaseUrl = avatarBaseUrl
                store.apiBaseUrl = apiBaseUrl
                store.appIsReady = false
                store.appRequiresAuth = false

                if (store.version == version) {
                    this.replaceState(Object.assign(state, store))
                } else {
                    state.version = version
                }
            }
        }
    },
    actions: {},
    modules: {}
})

store.subscribe((mutation, state) => {
    const data = {
        version: state.version,
        account: state.account
    }

    localStorage.setItem(localStorageName, JSON.stringify(data));
})

export default store