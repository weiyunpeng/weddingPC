<template>
        <div class="container">
            <div class="filter">
                <a href="javascript:void(0)" v-bind:class="{tag_active:isAct == 0}" @click="tagChange(0)">默认</a>
                <a href="javascript:void(0)" v-bind:class="{tag_active:isAct == 1}" @click="tagChange(1)">媒体评分</a>
                <a href="javascript:void(0)" v-bind:class="{tag_active:isAct == 2}" @click="tagChange(2)">价格<i class="price_icon" v-bind:class="{price_position:isHigh}"></i></a>
                <div class="fil_input">
                    <span>¥</span>
                    <input type="number" class="input_price" v-model.trim="minPrice">
                    <label>-</label>
                    <span>¥</span>
                    <input type="number" class="input_price" v-model.trim="maxPrice">
                    <div class="queryPrice" @click="qryPrice">确定</div>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            isAct:0,
            isHigh:true,
            price_position:'',
            minPrice:'',
            maxPrice:'',
            flag:/^[0-9]*[1-9][0-9]*$/
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
        })
    },
    mounted(){
        let self = this;
    },
    methods: {
        tagChange(index){
            let self = this;
            self.isAct = index;
            if(index == 2){
                //需要价格箭头的切换
                this.isHigh = !this.isHigh;
            }
        },
        qryPrice(){
            let self = this;
            // const data = {
            //     info: {
            //         text: '真的要删除吗?'
            //     }
            // };
            // this.$store.dispatch('showModal',data);
            // this.$store.dispatch('showMsg',{
            //     content: 'haha',
            //     type: 'danger'
            // });
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/filter.scss";
</style>
