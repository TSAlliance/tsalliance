import { AppConnection } from "../account/appConnection"
import { Member } from "../account/member"
import { TrustedError } from "../error/trustedError"
import { Router } from "../router"
import CryptUtil from "../utils/crypt"
import { Endpoint } from "./endpoint"

export default class AppConnectionEndpoint extends Endpoint {

    constructor() {
        super(Endpoint.AuthenticationFlag.FLAG_REQUIRED, [])
    }

    /**
     * @api {post} /connections/:uuid/:app Create connection
     */
    async actionCreateOne(route: Router.Route): Promise<Endpoint.Result> {
        let targetUUID = route.params?.["uuid"]
        let appId = route.params?.["app"]
        let code = route.body?.["code"]
        let redirect_uri = route.body?.["redirect_uri"]

        if(!redirect_uri) {
            return TrustedError.get(TrustedError.Errors.INTERNAL_ERROR)
        }

        // Check if Connection with app exists already
        let existsResult = await AppConnection.findAndCountAll({
            where: {
                appId,
                memberId: targetUUID
            },
            attributes: ['uuid']
        })

        if(existsResult.count > 0) {
            return TrustedError.get(TrustedError.Errors.RESOURCE_EXISTS)
        }

        // Connect discord app to account
        if(appId === 'discord') {

            // Get access_token from discord api
            let result = await AppConnection.obtainTokenFromDiscord(code, redirect_uri)

            if(result.statusCode == 200) {
                // Let token expire 2 seconds earlier (compensate ping)
                let expiresAt = Date.now() + ((result["data"]?.token.expires_in-2)*1000)

                let data = {
                    access_token: result["data"]?.token.access_token,
                    refresh_token: result["data"]?.token.refresh_token,
                    expiresAt
                }

                let createResult = await AppConnection.create({
                    appId,
                    data: CryptUtil.getInstance().encryptString(JSON.stringify(data)),
                    memberId: targetUUID,
                    foreignId: result["data"]?.user.id
                })

                if(createResult) {
                    return new Endpoint.ResultEmpty(200)
                } else {
                    return TrustedError.get(TrustedError.Errors.INTERNAL_ERROR)
                }
            } else {
                return result as TrustedError
            }
        } else {
            return TrustedError.get(TrustedError.Errors.UNKNOWN_ROUTE)
        }
    }

    /**
     * @api {get} /connections/:uuid/ Get connections
     */
    async actionGetAll(route: Router.Route): Promise<Endpoint.Result> {
        let targetUUID = route.params?.["uuid"]

        if(!targetUUID) {
            return TrustedError.get(TrustedError.Errors.INTERNAL_ERROR)
        }

        let connections = await AppConnection.findAll({ where: { memberId: targetUUID }, attributes: ['uuid', 'app', 'foreignId', 'createdAt']})
        return new Endpoint.ResultSet(200, connections, connections.length)
    }

    /**
     * @api {delete} /connections/:uuid/:app Delete connection
     */
    async actionDeleteOne(route: Router.Route): Promise<Endpoint.Result> {
        let targetUUID = route.params?.["uuid"]
        let appId = route.params?.["app"].toLowerCase()

        if(!targetUUID) {
            return TrustedError.get(TrustedError.Errors.INTERNAL_ERROR)
        }

        let affectedRows = await AppConnection.destroy({ 
            where: { 
                memberId: targetUUID,
                appId
            }
        })

        if(affectedRows == 0) {
            return TrustedError.get(TrustedError.Errors.RESOURCE_NOT_FOUND)
        } else {
            return new Endpoint.ResultEmpty(200)
        }
    }

}