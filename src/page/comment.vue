<template>
    <div class="user">
        <com-header></com-header>
        <div class="container">
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
</style>
