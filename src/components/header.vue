<template>
    <div class="header">
        <div class="container">
            <div class="logo"><router-link to="/"><img src="./../../static/images/logo.png" alt="" width="200" height="150"></router-link></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data(){
            return {
            }
        },
        computed: {
            ...mapGetters({
            }),
            ...mapActions({
            })
        },
        mounted(){
        },
        methods:{
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "./../assets/css/header.scss";
</style>
