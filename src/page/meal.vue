<template>
<div class="container">
    <com-tag></com-tag>
    <img v-lazy="img">
    <img v-lazy="img">
    <img v-lazy="img">
    <img v-lazy="img">
    <img v-lazy="img">
</div>
</template>

<script>
import tag from "./../components/meal/mealTag"
    export default {
        components: {
            comTag: tag
        },
        data(){
            return {
                img:'/static/images/bg.jpg'
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
