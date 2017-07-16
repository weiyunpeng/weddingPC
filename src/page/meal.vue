<template>
<div class="container">
    <img v-lazy="img">
    <img v-lazy="img">
    <img v-lazy="img">
    <img v-lazy="img">
    <img v-lazy="img">
    <com-tag></com-tag>
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
                img:'http://localhost:3000/public/uploads/thumbnail/upload_6823e4d35d4d56cd7aeb4ade9133c128.png'
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
