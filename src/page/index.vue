<template>
<div class="container">
    <com-tag></com-tag>
    <com-list></com-list>
</div>
</template>

<script>
import tag from "./../components/business/busTag"
import list from "./../components/business/busList"
    export default {
        components: {
            comTag: tag,
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
