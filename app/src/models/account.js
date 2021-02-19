import store from "@/store/index"
import { Api, TrustedError } from "./api"
import router from "../router"

export class Account {
    static instance = undefined

    static getInstance() {
        if(!this.instance) this.instance = new Account()
        return this.instance
    }

    /**
     * Sign-In a user using credentials to obtain session token
     * @param {String} username User's username
     * @param {String} password User's password
     */
    static async signInWithCredentials(username, password, handleError = false) {
        const result = await Api.getInstance().post("/auth/signin", {username, password}, handleError)

        if(result instanceof TrustedError) {
            return result
        }

        const data = result.data
        this.setAccessToken(data.token)
        
        let account = await this.loadAccount("@me")
        if(account instanceof TrustedError) {
            return account
        }

        account.session = data.token
        account.isLoggedIn = true
        await this.save(account)
        return account
    }

    /**
     * Function for saving session token locally
     * @param {String} value Session token, if falsy user gets invalidated
     * @param {Boolean} setCookie Save session in cookie or not
     */
    static setAccessToken(token){
        store.state.account.session = token
    }

    /**
     * Function for saving account data in localStorage
     * @param {String} value Session token, if falsy user gets invalidated
     * @param {Boolean} setCookie Save session in cookie or not
     */
    static async save(data){
        store.commit("updateAccount", data)
    }

    /**
     * Function for loggin-out a user
     */
    static async logout(redirect = false) {
        this.save(undefined).finally(() => {
            if(router.currentRoute.name != 'home' && redirect) {
                router.push({name: 'home'})
            }
        })
    }

    /**
     * Verify session by trying to load account data and check for errors
     */
    static async verifySession() {
        return new Promise((resolve) => {
            this.loadAccount("@me").then((result) => {
                if(!(result instanceof TrustedError)) {
                    this.save(result)
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    /**
     * Erases all loaded user data
     */
    async resetData() {
        store.state.account = {}
        store.state.user.session = undefined
        store.state.user.loggedIn = false
    }

    /**
     * Loads current logged in user's data by sending GET request
     */
    static async loadAccount(memberId) {
        let result = await Api.getInstance().get("/members/"+memberId, {}, true)
        if(result instanceof TrustedError) {
            return result
        }

        return result.data
    }

    /**
     * Loads current logged in user's data by sending GET request
     */
    static async reloadAccount() {
        let result = await Api.getInstance().get("/members/@me")
        if(result instanceof TrustedError) {
            return result
        }

        return result.data
    }

    /**
     * Send a request to register new user
     * @param {String} username User's username
     * @param {String} password User's password
     * @param {String} email User's email
     * @param {String} invite User's invite
     */
    static async registerAccount(username, password, email, invite, handleError = false) {
        return  await Api.getInstance().post("/auth/signup", {name: username, password, email, invite}, handleError)
    }

    /**
     * Upload new avatar
     */
    static async setAvatarMe(file) {
        return await this.setAvatar("@me", file)
    }

    /**
     * Upload new avatar for user
     * @param {*} uuid 
     */
    static async setAvatar(uuid, file) {
        let result = await Api.getInstance().upload("/avatars/"+uuid, file)
        if(result instanceof TrustedError) {
            return result
        }

        return result.data
    }
    
}