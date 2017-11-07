<template>
    <div>
        <com-header></com-header>
        <div class="banner">
            <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide class="photo_fl fl" v-for="(item,index) in getIndexPhoto.bannner" v-bind:key="index">
                        <img :src="item.img" height="530">
                        <div class="p-wrapper"><p><span>{{item.style}}</span>{{item.nickname}}拍摄于{{item.storeName}}</p></div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination">
                        <ul>
                            <li  v-for="(item,index) in getIndexPhoto.bannner">
                                <img :src="item.thumbnail" width="110" height="80">
                            </li>
                        </ul>
                    </div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        <div class="tips">
            <h2>
                婚纱照筹备小贴士
                <span></span>
            </h2>
            <ul>
               <a href="" target="_blank"> 
                   <li class="li-big">
                        <dl>
                            <dt class="dt-fg"></dt>
                            <dd>
                                <h4>选址婚纱照风格</h4>
                                <p>找你喜欢</p>
                            </dd>
                        </dl>
                    </li>
                </a>
                <li class="li-small"></li>
                <a href="" target="_blank"> 
                <li class="li-big">
                    <dl>
                        <dt class="dt-gl"></dt>
                        <dd>
                            <h4>学攻略看门道</h4>
                            <p>去学习</p>
                        </dd>
                    </dl>
                </li>
                </a>
                <li class="li-small"></li>
                <a href="" target="_blank"> 
                <li class="li-big">
                    <dl>
                        <dt class="dt-sj"></dt>
                        <dd>
                            <h4>选择靠谱商家</h4>
                            <p>去选择</p>
                        </dd>
                    </dl>
                </li>
                </a>
            </ul>
        </div>
        <div class="wrapper" style="overflow:hidden;">
            <div class="wrapper_left fl">
                <div class="wrapper-tit">婚纱照拍摄点评 篇 <span></span></div>
                <div class="section" v-for="(item,index) in getCommentList" v-bind:key="index">
                    {{getCommentList}}
                    <div class="section-tit"></div>
                    <p></p>
                    <ul>
                        <li></li>
                    </ul>
                    <div class="section-bottom">
                        <div class="business fl">
                            拍摄商家： &nbsp;拍摄时间：
                        </div>
                        <div class="seenumber">
                            看过 &nbsp;<i class=""></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrapper_right fr">
            </div>
        </div>
    </div>
</template>

<script>
import header from "./../components/user/userHead";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getIndexPhoto: "getIndexPhoto",
      getAuth: "getAuth",
      getCommentList: "getCommentList",
    }),
    ...mapActions({
      qryIndex: "qryIndex",
      qryComment: "qryComment",
    })
  },
  components: {
    comHeader: header,
    swiper: swiper,
    swiperSlide: swiperSlide
  },
  data() {
    return {
      loadshow: true,
      swiperOption: {
        notNextTick: true,
        setWrapperSize: true,
        slidesPerView: 1,
        mousewheelControl: false,
        observeParents: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        pagination: ".swiper-pagination",
        paginationType: "custom",
        // autoplayDisableOnInteraction : false,
        paginationElement: "li",
        preloadImages: false,
        lazyLoading: true,
        autoplay: 3000,
        speed: 300,
        loop: true,
        effects: "slide"
        // paginationCustomRender:function(){

        // }
        // onTransitionStart(swiper) {
        //   this.index = swiper.realIndex;
        // }
      }
    };
  },
  mounted() {
      this.$store.dispatch("qryComment")
      this.$store.dispatch("qryIndex")
  },

  watch: {
    getAuth() {
      if (this.getAuth) {
        this.$router.push({ name: "user" });
      }
    }
  },
  beforeDestroy() {}
};
</script>


<style rel="stylesheet/scss" lang="scss">
.banner {
  height: 530px;
  position: relative;
  width: 100%;
  // overflow:hidden;
  .swiper-container {
    width: 100%;
    height: 530px;
    .swiper-slide {
      width: 100%;
      height: 100%;
    }
    .swiper-pagination {
      overflow: hidden;
      position: absolute;
      top: 50px;
      left: 50%;
      margin-left: 488px;
      z-index: 666;
      ul li {
        cursor: pointer;
      }
    }
  }
  .photo_fl {
    position: relative;
  }
  .p-wrapper {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    bottom: 32px;
    left: 0;
  }
  .photo_fl p {
    font-size: 14px;
    color: #fff;
    position: absolute;
    right: 0;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  }
  .photo_fl p span {
    margin-right: 15px;
  }
}

.tips {
  width: 1070px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom:50px;
  h2 {
    width: 100%;
    text-align: center;
    color: #333;
    font-size: 24px;
    font-weight: normal;
    position: relative;
    padding-bottom: 10px;
    margin: 40px 0;
    span {
      display: block;
      width: 40px;
      height: 2px;
      background-color: #fe84b9;
      position: absolute;
      left: 50%;
      margin-left: -20px;
      bottom: 0;
    }
  }
  ul li {
    float: left;

    box-shadow: 0 1.5px 4px 0 rgba(0, 0, 0, 0.06);
    text-align:center;
  }
  ul li.li-big {
    width: 320px;
    border-radius: 8px;
    dl{display:inline-block;padding:45px 0;}
    dt{float:left;width:80px;height:80px;}
    dt.dt-fg{background:url(../../static/images/all1.png) 0 0 no-repeat;}
    dt.dt-gl{background:url(../../static/images/all1.png) -80px 0 no-repeat;}
    dt.dt-sj{background:url(../../static/images/all1.png) -160px 0 no-repeat;}
    dd{float:left;margin-left:20px;text-align:left;
    h4{
        font-size: 18px;color:#333;
        margin:16px 0 3px 0;
    }
    p{font-size: 16px;color:#9a9a9a;}
    }
  }
  ul li.li-big:hover{
      box-shadow: 0 6px 5px 1px rgba(0, 0, 0, 0.08);
      transition:all 0.5s ease;
  }
  ul li.li-small {
    width: 55px;
    height: 170px;
    background-color: red;
  }
}

</style>














