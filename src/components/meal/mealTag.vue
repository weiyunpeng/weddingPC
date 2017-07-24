<template>
    <div class="container">
        <ul class="tag">
            <li v-for="(tag,number) in mealTag" :key="tag.title">
                <strong>{{tag.title}} :</strong>
                <ul>
                    <li v-for="(tagCon,index) in tag.con" :key="tagCon">
                        <a href="javascript:void(0)" v-bind:class="{tag_active: tag.isTag==index}" @click="tagBtn(number,index)">{{tagCon}}</a>
                    </li>
                </ul>
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
            mealTag: 'mealTag'
        }),
        ...mapActions({
            qryMealList: 'qryMealList',
            mealClear: 'mealClear',
            qryMealTag: 'qryMealTag',
            mealTagClear:'mealTagClear',
            mealTagChange:'mealTagChange'
        })
    },
    mounted() {
        let data = {
            type: 'meal'
        }
        // this.$store.dispatch('mealTagClear')
        this.$store.dispatch('qryMealTag', data)
    },
    methods: {
        tagBtn(number, index) {
            let changeData = {
                index:index,
                number:number
            }
            this.$store.dispatch('mealTagChange' , changeData)
            let data = {
                type: 'meal'
            }
            this.$store.dispatch('mealClear')
            this.$store.dispatch('qryMealList', data)
        }
    },
    watch:{
        mealTag:function(){
            // console.log(this.mealTag)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "./../../assets/css/tag.scss";
</style>
