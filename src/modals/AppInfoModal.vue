<template>
    <div class="modal">
        <h1>Hello World</h1>
        <p>{{ content?.message }}</p>
    </div>
</template>

<script>
export default {
    props: {
        content: Object
    }
}
</script>