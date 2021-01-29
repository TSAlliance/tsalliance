<template>
    <div class="header-wrapper">
        <div class="content-container container-fluid">
            <img id="desktop-logo" src="@/assets/images/branding/ts_alliance_logo.svg" alt="Alliance Logo">
            <img id="mobile-logo" src="@/assets/images/branding/ts_logo.svg" alt="Alliance Logo">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.header-wrapper {
    display: block;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    padding: $windowPad;

    img {
        display: inline-block;
        height: 50px;
        vertical-align: middle;

        &#mobile-logo {
            display: none;
            height: 40px;
        }
    }
}

@media screen and (max-width: 850px) {
    .header-wrapper {
        padding: $windowPad/2;

        #desktop-logo {
            display: none;
        }
        #mobile-logo {
            display: inline-block !important;
        }
    }
}
@media screen and (max-width: 540px) {
    .header-wrapper {

        img {
            height: 45px;
        }
    }
}
</style>