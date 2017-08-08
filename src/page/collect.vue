<template>
    <div class="collect">
        <com-header></com-header>
        <div class="container">
            <div class="c-user"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/user/userHead'

export default {
    components: {
        comHeader: header,
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
        })
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    },
    watch: {
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.c-user{
    width: 183px;
    height: 600px;
    background: #fff;
}
</style>
