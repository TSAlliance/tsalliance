<template>
    <section id="landing-section" :style="'background-image: url('+require('@/assets/images/background/alliance_background.jpeg')+');'">
        <div class="content-container landing-title">
            <h5>Welcome to</h5>
            <h1>TSAlliance</h1>
        </div>

        <div class="content-container">
            <app-services-section></app-services-section>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'

import AppServicesSection from '@/views/main/sections/AppServicesSection.vue'

export default defineComponent({
    components: {
        AppServicesSection
    }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/elements/lists.scss";

#landing-section {
    position: relative;
    height: 100vh;
    
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    .content-container {
        text-align: center;
    }

    .landing-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-200%);
        margin: 2em 0;

        h5 {
            font-size: 2em;
            color: $colorPink;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 6em;
            font-weight: 800;
            color: $colorPurple;
            line-height: 1em;

            text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
        }
    }

    .landing-footer {
        position: absolute;
        bottom: 0;
        left: 50%;
        padding: $windowPad;
        transform: translateX(-50%);

        button {
            display: block;
            cursor: pointer;
            background: none;
            border: none;
            outline: none;

            img {
                height: 32px;
                width: 32px;
            }
        }
    }
}

button {
    animation: bounce 2s infinite;
}

@keyframes bounce {
	0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-10px);}
	60% {transform: translateY(-5px);}
}

@media screen and (max-width: 950px) {
    .landing-title {
        font-size: 0.8em;
        
    }
}

@media screen and (max-width: 580px) {
    .landing-title {
        font-size: 0.55em;
        top: 47% !important;
    }
}
@media screen and (max-width: 480px) {
    .landing-title {
        font-size: 0.45em;
        top: 45% !important;
    }
}
</style>