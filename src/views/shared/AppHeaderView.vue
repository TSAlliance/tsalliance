<template>
    <div class="header-wrapper">
        <div class="content-container container-fluid">
            <div class="header-section branding-section">
                <img id="desktop-logo" src="@/assets/images/branding/ts_alliance_logo_dark.svg" alt="Alliance Logo">
                <img id="mobile-logo" src="@/assets/images/branding/ts_logo_dark.svg" alt="Alliance Logo">
            </div>

            <div class="header-section profile-section" v-if="$store.state.account.isLoggedIn">
                <app-avatar class="avatar-m avatar-round" @click="$router.push({name: 'account'})" style="cursor: pointer;">{{ $store.state.account.name }}</app-avatar>
            </div>
            
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.header-wrapper {
    display: inline-block;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;

    .content-container {
        padding: $windowPad;
    }

    .header-section {
        display: inline-block;
        vertical-align: middle;
        
        &:last-of-type:not(:first-of-type) {
            float: right;
        }
    }

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