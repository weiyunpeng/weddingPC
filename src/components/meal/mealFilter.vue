<template>
        <div class="container">
            <div class="filter">
                <a href="javascript:void(0)" v-bind:class="{tag_active:method == 0}" @click="tagChange(0)">默认</a>
                <a href="javascript:void(0)" v-bind:class="{tag_active:method == 1}" @click="tagChange(1)">媒体评分</a>
                <a href="javascript:void(0)" v-bind:class="{tag_active:method == 2}" @click="tagChange(2)">价格<i class="price_icon" v-bind:class="{priceSort:isHigh}"></i></a>
                <div class="fil_input">
                    <span>¥</span>
                    <input type="number" class="input_price" v-model.number="minPrice">
                    <label>-</label>
                    <span>¥</span>
                    <input type="number" class="input_price" v-model.number="maxPrice">
                    <a href="javascript:void(0)" class="queryPrice" @click="qryPrice">确定</a>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            method:0,
            isHigh:0,
            priceSort:'',
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
            self.method = index;
            if(index == 2){
                //需要价格箭头的切换
                if(this.isHigh){
                    this.isHigh = 0
                }else{
                    this.isHigh = 1
                }
            }
            this.$emit('ajaxfilter',index,this.isHigh);
        },
        qryPrice(){
            if(!this.minPrice || !this.maxPrice || !this.flag.test(this.minPrice) || !this.flag.test(this.maxPrice)){
                alert("请输入正确的价格")
            }else{
                this.$emit('ajaxPrice',this.minPrice,this.maxPrice);
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/filter.scss";
</style>
