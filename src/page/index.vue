<template>
    <div>
        <div class="i-header" :style="{
            background:'url('+ getIndexPhoto.banner +' ) left center no-repeat', borderBottom:skinBorder}">
            <img class="logo zoomIn" v-lazy="getIndexPhoto.logo || logo">
            <div class="header-con">
                <a href="http://dev.hunjia.qqdayu.com/login" target="_blank">
                    <img class="user" src="/static/images/user_icon.png">
                </a>
                <ul class="zoomIn">
                    <li class="flipInY" v-for="(nav,navNum) in getIndexPhoto.nav" :key="navNum">
                        <router-link :to="{ name: 'user'}" target="_blank" v-if="navNum == 0">
                            <img :src="nav.img || '/static/images/demo_01.jpg'" width="390" height="390">
                        </router-link>
                        <router-link :to="{ name: 'guide'}" target="_blank" v-if="navNum == 1">
                            <img :src="nav.img || '/static/images/demo_02.jpg'" width="390" height="390">
                        </router-link>
                        <router-link :to="{ name: 'comment'}" target="_blank" v-if="navNum == 2">
                            <img :src="nav.img || '/static/images/demo_03.jpg'" width="390" height="390">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    
        <!--热门婚纱照  -->
        <div class="hot-wedding">
            <div class="container">
                <img class="tit" src="/static/images/hot_hs_head.png">
                <router-link :to="{ name: 'user', query: {}}" class="more_a fr u-index-nav" target="_blank">
                    查看更多>
                </router-link>
                <waterfall :line-gap="291" :min-line-gap="320" :max-line-gap="640" :single-max-width="640" :watch="getIndexPhoto.list">
                    <waterfall-slot v-for="(item, index) in getIndexPhoto.list" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="photo_move">
                        <div class="panel photo_box hover_sh">
                            <img :src="item.img" @click="showPhotoModal(item, index)">
                            <div class="photo_info">
                                <span class="photo_like" @click="photoLikeBtn(item.id,index)">
                                    <!-- <i class="icon_like_act"></i>  -->
                                    <i class="icon_like"></i> {{item.fav_num}}
                                </span>
                                <ul>
                                    <li v-for="(tag,t) in item.tag" :key="t">{{tag}}</li>
                                </ul>
                            </div>
    
                        </div>
                    </waterfall-slot>
                </waterfall>
            </div>
        </div>
    
        <!--热门攻略  -->
        <div class="hot-raiders">
            <div class="container">
                <img class="tit" src="/static/images/hot_gl_head.png">
                <router-link :to="{ name: 'guide', query: {}}" class="more_a fr u-index-nav" target="_blank">
                    查看更多>
                </router-link>
                <ul>
                    <li v-for="(raiders,raiNum) in getIndexPhoto.guide" :key="raiNum">
                        <a :href="raiders.url" target="_blank">
                            <div class="img-hover fl">
                                <img v-lazy="raiders.img" width="195" height="192">
                            </div>
    
                            <div class="fr raid-con">
                                <p>{{raiders.title}}</p>
                                <span>{{raiders.con}}</span>
                                <div class="raid-num fr">
                                    浏览{{raiders.view}} 评论{{raiders.comment}}
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    
        <!--商家评论  -->
        <div class="store-comment">
            <div class="container">
                <img class="tit" src="/static/images/bus_dp_head.png">
                <router-link :to="{ name: 'comment', query: {}}" class="more_a fr u-index-nav" target="_blank">
                    查看更多>
                </router-link>
                <ul>
                    <li v-for="(store,storeNum) in getIndexPhoto.store" :key="storeNum">
                        <router-link :to="{ name: 'busDeatils', query: {id:store.id,busName:store.store_name}}" target="_blank">
                            <img v-lazy="store.img" height="210" width="295">
                        </router-link>
                        <div class="com-con">
                            <router-link :to="{ name: 'busDeatils', query: {id:store.id,busName:store.store_name}}" target="_blank">
                                <p>{{store.store_name}}</p>
                            </router-link>
                            <div class="clearfix">
                                <label class="fl">媒体评定分：</label>
                                <div class="media_rating fl">
                                </div>
                            </div>
                            <a :href="store.url" target="_blank">
                                <div class="clearfix">
                                    <label>拍客评价：</label>
                                    <span class="blog">
                                        {{store.desc}}
                                    </span>
                                </div>
                            </a>
                        </div>
    
                    </li>
                </ul>
            </div>
        </div>
        <com-photoModal v-model="show" :value="show" :photoModal="photoModal" :index="index">
        </com-photoModal>
    </div>
</template>

<script>
import { waterfall, waterfallSlot } from 'vue-waterfall'
import photoModal from './../components/photoModal'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        'waterfall': waterfall,
        'waterfallSlot': waterfallSlot,
        'comPhotoModal': photoModal
    },
    computed: {
        ...mapGetters({
            getIndexPhoto: 'getIndexPhoto',
            getAuth:'getAuth'
        }),
        ...mapActions({
            qryIndex: 'qryIndex',
            qryViewPhoto: 'qryViewPhoto'
        })
    },
    data() {
        return {
            show: false,
            photoModal: {},
            index: null,
            banner: '/static/images/unlogin_bg.jpg',
            skinBorder: '2px solid #f2f2f2',
            logo: '/static/images/logo-3.png'
        }
    },
    mounted() {
        this.$store.dispatch('getUserInfo');
        this.$store.dispatch('qryIndex')
    },
    methods: {
        photoLikeBtn() {
            alert('登录后才能收藏哦~')
        },
        showPhotoModal(item, index) {
            this.photoModal = item;
            this.index = index;
            this.show = true;
            const ajaxdata = {
                id: this.photoModal.id
            }
            this.$store.dispatch('qryViewPhoto', ajaxdata)
        }
    },
    watch: {
        getAuth(){
            if(this.getAuth){
                this.$router.push({ name: 'user'})
            }
        }
    },
    beforeDestroy() {
    }
}
</script>


<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/index.scss";
.u-index-nav:hover{
    color: #fd4040;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}
</style>
