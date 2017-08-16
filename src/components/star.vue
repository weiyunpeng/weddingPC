<template>
    <div class="star">
        <span v-for="(itemClass,key) in itemClasses" :class="itemClass" class="star-item" :key="key"></span>
    </div>
</template>
<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_LITTLE = 'little';
    const CLS_MOST = 'most';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    export default{
        props:{
            score:{
                type: Number
            }
        },
        computed:{
            itemClasses(){
                let result = [];
                let score = Math.floor(this.score*10)/10;//获取分数，计算到小数点后一位
                let integer = Math.floor(score);//获取分数的整数部分
                let decimal = score-integer;
                decimal = Math.floor(decimal*10)/10//获取小数点后面的部分
                for(let i =0;i<integer;i++){
                    result.push(CLS_ON);
                }
                if(decimal == 0){
                    result.push(CLS_OFF);
                }else if(decimal < 0.4){
                    result.push(CLS_LITTLE);
                }else if(decimal < 0.7){
                    result.push(CLS_HALF);
                }else if(decimal < 1){
                    result.push(CLS_MOST);
                }
                while(result.length<LENGTH){
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.star{
.star-item{
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 19px;
    background: url("/static/images/icon_star.png");
    background-position: 212px -2px;
}
.on{
        background-position: 25px -2px;
    }
    .little{
        background-position: 166px -2px;
    }
    .half{
        background-position: 118px -2px;
    }
    .most{
        background-position: 72px -2px;
    }
    .off{
        background-position: 212px -2px;
    }
}
</style>