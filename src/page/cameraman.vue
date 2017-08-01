<template>
<div>
<com-header></com-header>
<div class="container">
    <com-store :storeInfo="camaramanBusinfo"></com-store>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/headerDetails'
import storeInfo from './../components/storeInfo'
    export default {
        components: {
            comHeader: header,
            comStore:storeInfo
        },
        data(){
            return {
            }
        },
        computed: {
            ...mapGetters({
                camaraman:'camaraman',
                camaramanBusinfo:'camaramanBusinfo',
                camaramanPackages:'camaramanPackages'
            }),
            ...mapActions({
                qryCamaramanDetails:'qryCamaramanDetails'
            })
        },
        mounted(){
            let data = {
                id:'1'
            }
            this.$store.dispatch('qryCamaramanDetails', data)
        },
        methods: {
        },
        watch:{
            camaraman(){
                // console.log(this.camaraman)
            },
            camaramanBusinfo(){
                console.log(this.camaramanBusinfo)
            },
            camaramanPackages(){
                // console.log(this.camaramanPackages)
            }
        },
        beforeDestroy () {
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/cameraman.scss";
</style>
