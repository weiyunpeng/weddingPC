<template>
    <div class="container">
        <ul class="tag">
            <li v-for="(tag,number) in mealTag" :key="tag.title">
                <strong>{{tag.title}} :</strong>
                <ul>
                    <li v-for="(tagCon,index) in tag.con" :key="index">
                        <a href="javascript:void(0)" v-bind:class="{tag_active: tag.selected==index}" @click="tagBtn(number,index,tagCon.id,tag.name)">{{tagCon.name}}</a>
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
        tagBtn(number, index,id,name) {
            let changeData = {
                index:index,
                number:number
            }
            this.$store.dispatch('mealTagChange' , changeData)
            let ajaxdata = {}
            ajaxdata[name] = id
            this.$store.dispatch('qryMealList', ajaxdata)
        }
    },
    watch:{
        mealTag:function(){
            console.log(this.mealTag)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "./../../assets/css/tag.scss";
</style>
