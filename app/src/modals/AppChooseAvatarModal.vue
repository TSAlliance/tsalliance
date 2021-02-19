<template>
    <app-modal>
        <template #title>
            <p>Avatar ändern</p>
        </template>
        <template #content>
            <ul class="modal-list">
                <li class="label">Hinweise</li>
                <li>Empfohlen sind Bilder im Format 512x512</li>
                <li>Unterstütze Formate sind: JPEG, JPG, PNG</li>
            </ul>
            <div class="drag-area" @click="openFileDialog" @drop.prevent="chooseFile" @dragover.prevent>
                <p>Bild auswählen oder in diesen Bereich ziehen</p>
            </div>
            <input type="file" name="input_avatar" id="input_avatar" accept=".png,.jpeg,.jpg" hidden @input="chooseFile">
        </template>
        <template #footer>
            <button class="btn btn-primary btn-tertiary btn-m" @click="executeNegativeCallback">Abbrechen</button>
            <app-button class="btn btn-primary btn-m" @clicked="executePositiveCallback">OK</app-button>
        </template>
    </app-modal>
</template>

<script>
export default {
    data() {
        return {
            isUploading: false,
            maxProgress: 0,
            progress: 0
        }
    },
    props: {
        content: Object
    },
    computed: {
        hasTitle() {
            return !!this.content?.title
        }
    },
    methods: {
        next() {
            this.$modal.dismiss()
        },
        executePositiveCallback(event, done) {
            if(this.content?.onPositive) {
                this.content.onPositive(() => {
                    done()
                    this.next()
                })
            } else {
                done()
                this.next()
            }
        },
        executeNegativeCallback() {
            if(this.content?.onNegative) {
                this.content.onNegative(this.next)
            } else {
                this.next()
            }
        },
        openFileDialog() {
            document.getElementById("input_avatar")?.click()
        },
        chooseFile(event) {
            let file
            if(event.dataTransfer) {
                file = event.dataTransfer.files[0]
            } else {
                file = event.target.files[0]
            }

            this.$account.setAvatarMe(file).then((result) => {
                console.log(result)
            })
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

.modal-list {
    display: block;
    width: 100%;
    padding: 1em;
    font-size: 0.85em;
    opacity: 0.8;

    li {
        line-height: 1.2em;

        &.label {
            padding: 0.3em 0;
            list-style: none;
            margin-left: -1em;
        }
    }
}

.drag-area {
    display: flex;

    align-items: center;
    justify-items: center;

    width: 100%;
    height: 128px;
    background-color: $colorPrimary;
    border-radius: $borderRadNormal;
    border: 2px $colorPlaceholder dashed;

    cursor: pointer;
}
</style>