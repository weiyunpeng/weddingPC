<template>
    <div class="star">
        <span v-for="(itemClass,key) in itemClasses" :class="itemClass" class="star-item" :key="key"></span>
    </div>
</template>
<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
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
                let score = Math.floor(this.score*2)/2; //将数值调整为整数及.5的形式，例：4.3 => 4；4.6 => 4.5
                let hasDecimal = score %1 !==0;
                let integer = Math.floor(score);
                for(let i =0;i<integer;i++){
                    result.push(CLS_ON);
                }
                if(hasDecimal){
                    result.push(CLS_HALF);
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
    background-position: 25px -3px;
    .on{
        background-position: 25px -3px;
    }
    .half{
        background-position: 118px -3px;
    }
    .off{
        background-position: 72px -3px;
    }
}
}
</style>