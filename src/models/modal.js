import store from '@/store'
import { generateId } from '@/utils/generatorUtil'

export class Modal {

    static dismiss() {
        let lastIndex = store.state.modals?.length - 1
        store.state.modals?.splice(lastIndex, 1)

        if(!store.state.modal || store.state.modals?.length <= 0) {
            setTimeout(() => {
                store.state.app.showModal = false
            }, 200)
        }
    }

    static async showInfoModal(message) {
        const component = (await import("@/modals/AppInfoModal.vue"))
        this.mountModal({
            component: component?.default,
            content: {
                message
            },
            uuid: generateId(6)
        })
    }

    static async mountModal(modal) {
        store.state.app.showModal = true
        store.state.modals.push(modal)
    }

}