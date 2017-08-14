<template>
   <div class="meal_introduction clearfix">
            <div class="bus_name">
                {{storeInfo.store_name}}
                <i class="icon icon-yes" v-if="storeInfo.isYes"></i>
                <i class="icon icon-vip" v-if="storeInfo.isVip"></i>
            </div>
            <div class="second clearfix">
                <div class="clearfix fl">
                    <label class="fl">媒体评定分：</label>
                    <div class="media_rating fl">
                        <ul class="star1">
                            <li v-for="n in 5" :key="n"></li>
                        </ul>
                        <ul class="star2">
                            <li v-for="m in storeInfo.star" class="red" :key="m"></li>
                        </ul>
                    </div>
                </div>
                <div class="address fl">
                    地址：{{storeInfo.address}}
                </div> 
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props:{
        storeInfo:{
            type:Object,
            default:{}
        }
    },
    mounted(){
        
    },
    methods: {
    },
    watch:{
        storeInfo(){
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.bus_name {
      font-size: 26px;
      color: #333;
      margin-bottom: 10px;
      i {
        float: none;
        display: inline-block;
      }
    }
.second {
    margin-bottom: 20px;
    font-size: 16px;
    color: #808080;
    .media_rating {
    position: relative;
    margin-right: 50px;
    .star2 {
        position: absolute;
        left: 0;
        top: 0;
    }
    li {
        display: inline-block;
        margin-right: 5px;
        width: 20px;
        height: 19px;
        background: url("/static/images/star.png");
        background-position: -10px -10px;
    }
    li.red {
        background-position: -50px -10px;
    }
    }
}
.address {
                position: relative;
                color: #808080;
                font-size: 16px;
          }
</style>
