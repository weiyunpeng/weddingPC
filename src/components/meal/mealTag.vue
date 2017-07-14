<template>
        <div class="container">
            <ul>
                <li>
                    tag
                </li>
            </ul>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
        })
    },
    methods: {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/tag.scss";
</style>
