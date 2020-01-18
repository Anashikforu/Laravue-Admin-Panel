<template>
    <div>
        <v-container>
            <v-alert type="info">
                I am Admin
            </v-alert>
            <v-btn  link to="/bar">Load bar</v-btn>
            <v-btn  link to="/foo">Load foo</v-btn>
            <v-btn  link to="/user/Ashik">Load User</v-btn>
        </v-container>
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
