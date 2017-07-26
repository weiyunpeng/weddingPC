<template>
    <div class="left_zoom">
        <div class="big_img" @click="bigBtn">
            <img v-lazy="imgs[currentIndex]" width="600" height="400">
        </div>
        <div class="small_img">
            <transition-group tag="ul" name="list">
                <li v-for="(item,index) in imgs" :key="index" v-show="currentIndex-index<1" :class="{'active':index===currentIndex}" @click="currentShow(index)">
                    <img v-lazy="item" width="144" height="96">
                </li>
                <li v-for="(item,index) in imgs" :key="index" v-show="currentIndex-index>1" :class="{'active':index===currentIndex}" @click="currentShow(index)">
                    <img v-lazy="item" width="144" height="96">
                </li>
            </transition-group>
            <div class="arrow">
                <a href="javascript:void(0)" class="prev" @click="prevBtn"></a>
                <a href="javascript:void(0)" class="next" @click="nextBtn"></a>
            </div>
        </div>
        <div class="zoom_img" v-show="isBig" @click="bigBtn">
            <img :class="{ zoomIn: isBig }" :src="imgs[currentIndex]">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
            isBig:false
        }
    },
    props:{
        imgs:{
            type:Array,
            default:[]
        }
    },
    mounted(){
    },
    methods: {
        prevBtn(){
            this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.imgs.length-1
            }
        },
        nextBtn(){
            this.currentIndex++
            if (this.currentIndex > this.imgs.length - 1) {
                this.currentIndex = 0
            }
        },
        currentShow(index){
            this.currentIndex = index
        },
        bigBtn(){
            this.isBig= !this.isBig
        }
    },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.hide{display:none}
.zoom_img{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,0.4);
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    padding:50px;
    img{
        width:100%;
        height:100%;
    }
}
.left_zoom {
    float: left;
    width: 600px;
    .small_img {
      position: relative;
      margin: {
        right: -8px;
        top: 8px;
      }
      ul{
          width: 100%;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
      }
      li {
        display: inline-block;
        margin-right: 8px;
      }
      .arrow {
        a {
          display: block;
          position: absolute;
          top: 50%;
          margin-top: -23px;
          width: 26px;
          height: 46px;
          background: url("/static/images/icon1.png");
        }
        .prev {
          background-position: top left;
          left: 0;
        }
        .next {
          right: 8px;
          background-position: top right;
        }
      }
    }
    .active{
        border: 3px solid #a06aee;
        border-image: linear-gradient( #fb84af, #8d63fd, #a06aee) 1 1;
        background: transparent;
        filter:progid:DXImageTransform.Microsoft.gradient(enabled='false',startColorStr='#fb84af',endColorStr='#8d63fd');
    }
  }
  .list-enter-active {
    // transition: all 0.5s ease;
    transform: translateX(0)
    }

    .list-leave-active {
    // transition: all 0.1s ease;
    transform: translateX(-100%)
    }

    .list-enter {
    transform: translateX(100%)
    }

    .list-leave {
    transform: translateX(0)
    }
</style>
