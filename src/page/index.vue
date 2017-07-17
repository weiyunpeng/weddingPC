<template>
<div class="container">
    <com-tag></com-tag>
    <com-filter></com-filter>
    <com-list></com-list>
</div>
</template>

<script>
import tag from "./../components/business/busTag"
import busFilter from "./../components/business/busFilter"
import list from "./../components/business/busList"
    export default {
        components: {
            comTag: tag,
            comFilter: busFilter,
            comList:list
        },
        data(){
            return {
            }
        },
        mounted(){
        },
        methods: {
        },
        beforeDestroy () {
        }
    }
</script>
