<template>
    <div class="modal" :id="modalId+'container'">
        <div class="modal-section modal-header" v-if="hasTitle" :id="modalId+'header'">
            <slot name="title"></slot>
        </div>
        <div class="modal-section modal-scroll-area" :id="modalId+'content'">
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
        </div>
        <div class="modal-section modal-footer" :id="modalId+'footer'">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modalId: this.generateId(6)
        }
    },
    computed: {
        hasTitle() {
            return !!this.$slots.title
        },
        hasFooter() {
            return !!this.$slots.footer
        }
    },
    methods: {
        calculateContentHeight() {
            const wrapperElement = document.getElementById("modal-wrapper")
            const containerElement = document.getElementById(this.modalId+'container')

            const headerElement = document.getElementById(this.modalId+'header')
            const footerElement = document.getElementById(this.modalId+'footer')
            const contentElement = document.getElementById(this.modalId+'content')

            const wrapperPad = parseInt(window.getComputedStyle(wrapperElement, null).getPropertyValue('padding').replace("px", ""))
            const windowHeight = (window.innerHeight - (wrapperPad*4))
            let containerHeight = parseFloat(containerElement ? containerElement.getBoundingClientRect().height : 0)

            if(windowHeight <= containerHeight) {
                containerHeight = windowHeight + wrapperPad
                containerElement.style.height = containerHeight + "px"
            }

            let headerHeight = parseFloat(headerElement ? headerElement.getBoundingClientRect().height : 0)
            let footerHeight = parseFloat(footerElement ? footerElement.getBoundingClientRect().height : 0)

            let contentHeight = containerHeight - headerHeight - footerHeight
            contentElement.style.maxHeight = contentHeight + 1 + "px"
        }
    },
    mounted() {
        this.calculateContentHeight()
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
</style>