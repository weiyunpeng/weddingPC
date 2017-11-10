<template>
<div class="filter">
        <div class="container">
            <div class="filter-con">
                <a href="javascript:void(0)" v-bind:class="{tag_active:method == 0}" @click="tagChange(0)">默认</a>
                <a href="javascript:void(0)" v-bind:class="{tag_active:method == 2}" @click="tagChange(2)">价格<i class="price_icon" v-bind:class="{price_position:isHigh}"></i></a>
                <div class="fil_input">
                    <span>¥</span>
                    <input type="number" class="input_price base-color" v-model.number="minPrice">
                    <label>-</label>
                    <span>¥</span>
                    <input type="number" class="input_price base-color" v-model.number="maxPrice">
                    <a href="javascript:void(0)" class="queryPrice" @click="qryPrice">确定</a>
                </div>
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
            minPrice:'',
            maxPrice:'',
            flag:/^\d+$/
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
            showModal:'showModal'
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
            if(!this.flag.test(this.minPrice) || !this.flag.test(this.maxPrice) || this.minPrice >= this.maxPrice){
                const data = {
                    name: 'delPhoto',
                    info: {
                        text: '请输入正确的价格'
                    }
                };
                this.$store.dispatch('showModal',data);
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
