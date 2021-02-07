import store from "@/store/index"
import { Api, TrustedError } from "./api"

export class Module {

    constructor(moduleId, name, url, avatar) {
        this.moduleId = moduleId
        this.name = name
        this.url = url
        this.avatar = avatar
    }

    getAvatarUrl() {
        return store.state.config.api.protocol+"://"+store.state.config.api.host + (store.state.config.api.port != 0 ? ":" + store.state.config.api.port : "") + "/avatars/" + this.avatar
    }
    
    /**
     * Load module data identified by id
     * @param {String} moduleId Module's id
     */
    static async findModule(moduleId) {
        const result = await Api.getInstance().get("/modules/"+moduleId)

        if(result.statusCode == 200) {
            return new Module(result.data["moduleId"], result.data["name"], result.data["url"], result.data["avatar"])
        } else {
            return new TrustedError(result.statusCode, result.errorId, result.message, result.processId, result.timestamp)
        }
    }

    /**
     * Load all available modules
     */
    static async findAll() {
        const result = await Api.getInstance().get("/modules")

        if(result.statusCode == 200) {
            const list = []

            for(const module of result.entries){
                list.push(new Module(module["moduleId"], module["name"], module["url"], module["avatar"]))
            }

            return list
        } else {
            return new TrustedError(result.statusCode, result.errorId, result.message, result.processId, result.timestamp)
        }
    }

    /**
     * Same as findAll() but also simultaneously adds dataset to vue-store
     */
    static async loadAll() {
        store.state.modules = {}

        let result = await this.findAll()
        if(!(result instanceof TrustedError)) {
            for(let module of result) {
                this.setModule(module.uuid, module)
            }
        }
    }

    /**
     * Update module data in vue-store
     * @param {String} uuid Module's uuid
     * @param {Object} moduleData Updated data, containing a uuid prop
     */
    static async setModule(uuid, moduleData) {
        if(moduleData) {
            store.state.modules[uuid] = moduleData
        } else {
            delete store.state.modules[uuid]
        }
    }

    /**
     * Delete module identified by id
     * @param {String} uuid Module's uuid
     */
    static async delete(uuid) {
        console.log(uuid)
        /*let result = await axios.delete('/modules/'+uuid)
        if(result.code == 200 || result.code == 404) {
            this.setModule(uuid, undefined)
        }
        return result*/
    }

    /**
     * Update module identified by id
     * @param {String} uuid Module's uuid
     * @param {Object} data Updated module data
     * @param {String} data.name Name of module
     * @param {String} data.url URL of module
     */
    static async update(uuid, data) {
        console.log(uuid, data)
        /*let result = await axios.put('/modules/'+uuid, data)
        if(result.code == 200) {
            this.setModule(uuid, data)
        }
        return result*/
    }

     /**
     * Create new module
     * @param {Object} data Module data
     * @param {String} data.name Name of module
     * @param {String} data.url URL of module
     */
    static async create(data) {
        console.log(data)
        /*let result = await axios.post('/modules', data)
        if(result.code == 200) {
            let module = result.data
            this.setModule(module.uuid, module)
        }
        return result*/
    }

}