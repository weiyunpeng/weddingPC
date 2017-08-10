<template>
    <div>
        <com-header></com-header>
        <div class="hot-raiders">
            <div class="container" style="padding-bottom:50px;">
                <ul>
                    <li v-for="(item,guideNum) in getGuideList" :key="guideNum">
                        <a :href="item.url" target="_blank">
                            <div class="img-hover fl">
                                <img v-lazy="item.img" width="195" height="195">
                            </div>
    
                            <div class="fr raid-con">
                                <p>{{item.title}}</p>
                                <span>{{item.con}}</span>
                                <div class="raid-num fr">
                                    浏览{{item.view}} 评论{{item.comment}}
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
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
            getGuideList: 'getGuideList'
        }),
        ...mapActions({
            qryGuideList: 'qryGuideList'
        })
    },
    data() {
        return {
        }
    },
    mounted() {
        this.$store.dispatch('qryGuideList');
    },
    methods: {
    },
    watch: {
        getGuideList() {
            console.log(this.getGuideList)
        }
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../assets/css/index.scss";
</style>
