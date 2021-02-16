import store from '@/store'
import { generateId } from '@/utils/generatorUtil'

export class Modal {

    static dismiss(event = undefined) {
        if(event) {
            if(event.target.id != "modal-wrapper") {
                return
            }
        }

        let lastIndex = store.state.modals?.length - 1
        store.state.modals?.splice(lastIndex, 1)

        if(!store.state.modal || store.state.modals?.length <= 0) {
            setTimeout(() => {
                store.state.app.showModal = false
            }, 200)
        }
    }

    static async showInfoModal(message, title = undefined, onPositive = undefined, onNegative = undefined) {
        const component = (await import("@/modals/AppInfoModal.vue"))
        this.mountModal({
            component: component?.default,
            content: {
                message,
                title,
                onPositive,
                onNegative
            },
            uuid: generateId(6)
        })
    }

    static async showConfirmModal(value, onPositive = undefined, onNegative = undefined) {
        const component = (await import("@/modals/AppConfirmModal.vue"))
        this.mountModal({
            component: component?.default,
            content: {
                title: "Bestätigung erforderlich",
                message: "Um mit der Aktion fortzufahren musst du erst den Vorgang bestätigen. Schreibe hierzu folgendes in das Eingabefeld:",
                value,
                onPositive,
                onNegative
            },
            uuid: generateId(6)
        })
    }

    static async showMessage(title, message, onPositive = undefined) {
        const component = (await import("@/modals/AppMessageModal.vue"))
        this.mountModal({
            component: component?.default,
            content: {
                title,
                message,
                onPositive
            },
            uuid: generateId(6)
        })
    }

    static async mountModal(modal) {
        store.state.app.showModal = true
        store.state.modals.push(modal)
    }

}