<template>
    <div>
        <div class="i-header" :style="{background:'url('+banner+') left center no-repeat', borderBottom:skinBorder}">
            <img class="logo zoomIn" v-lazy="logo">
            <div class="header-con">
                <a href="http://dev.hunjia.qqdayu.com/login" target="_blank">
                    <img class="user" src="/static/images/user_icon.png">
                </a>
                <ul class="zoomIn">
                    <li class="flipInY">
                        <router-link :to="{ name: '', query: {}}" target="_blank">
                            <img v-lazy="test" width="390" height="390">
                        </router-link>
                    </li>
                    <li class="flipInY">
                        <img v-lazy="test" width="390" height="390">
                    </li>
                    <li class="flipInY">
                        <img v-lazy="test" width="390" height="390">
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="hot-wedding">
                <img class="tit" src="/static/images/hot_hs_head.png">
                <router-link :to="{ name: '', query: {}}" class="more_a fr" target="_blank">
                    查看更多>
                </router-link>
            </div>
            <waterfall :line-gap="291" :min-line-gap="320" :max-line-gap="640" :single-max-width="640" :watch="getPhotoList.list">
                <waterfall-slot v-for="(item, index) in getPhotoList.list" :width="291" :height="item.height" :order="index" :key="item.index" move-class="photo_move">
                    <div class="panel photo_box hover_sh">
                        <!-- <div class="photo_box_top">
                                            <span class="photo_like" @click="photoLikeBtn(item._id,index)"><i class="iconfont icon-like"></i> {{item.likeCount}}</span>
                                        </div> -->
                        <img :src="item.img" @click="showPhotoModal(item, index)">
                        <div class="photo_info">
                            <span class="photo_like" @click="photoLikeBtn(item.id,index)">
                                <i class="iconfont icon-like"></i> {{item.fav_num}}
                            </span>
                            <ul>
                                <li v-for="(tag,t) in item.tag" :key="t">{{tag}}</li>
                            </ul>
                        </div>
    
                    </div>
                </waterfall-slot>
            </waterfall>
    
            <div class="hot-raiders">
                <img class="tit" src="/static/images/hot_gl_head.png">
                <router-link :to="{ name: 'guide', query: {}}" class="more_a fr" target="_blank">
                    查看更多>
                </router-link>
                <ul>
                    <li>
                        <div class="img-hover fl">
                            <img src="/static/images/demo04.png" width="195">
                        </div>
                        
                        <div class="fr raid-con">
                            <p>拍的照片我不满意怎么办</p>
                            <span>我在活动当中，看上一个女孩子，能否帮忙联系一下？“小姑娘，下次我能不能帮我儿子去相亲？”......面对这样的强需求，我们在7月策划的百人相亲活动终于开始招募了...</span>
                            <div class="raid-num fr">
                                浏览338 评论25
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="img-hover fl">
                            <img src="/static/images/demo04.png" width="195">
                        </div>
                        <div class="fr raid-con">
                            <p>拍的照片我不满意怎么办</p>
                            <span>我在活动当中，看上一个女孩子，能否帮忙联系一下？“小姑娘，下次我能不能帮我儿子去相亲？”......面对这样的强需求，我们在7月策划的百人相亲活动终于开始招募了...</span>
                            <div class="raid-num fr">
                                浏览338 评论25
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="img-hover fl">
                            <img src="/static/images/demo04.png" width="195">
                        </div>
                        <div class="fr raid-con">
                            <p>拍的照片我不满意怎么办</p>
                            <span>我在活动当中，看上一个女孩子，能否帮忙联系一下？“小姑娘，下次我能不能帮我儿子去相亲？”......面对这样的强需求，我们在7月策划的百人相亲活动终于开始招募了...</span>
                            <div class="raid-num fr">
                                浏览338 评论25
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="img-hover fl">
                            <img src="/static/images/demo04.png" width="195">
                        </div>
                        <div class="fr raid-con">
                            <p>拍的照片我不满意怎么办</p>
                            <span>我在活动当中，看上一个女孩子，能否帮忙联系一下？“小姑娘，下次我能不能帮我儿子去相亲？”......面对这样的强需求，我们在7月策划的百人相亲活动终于开始招募了...</span>
                            <div class="raid-num fr">
                                浏览338 评论25
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
    
            <div class="store-comment">
                <img class="tit" src="/static/images/bus_dp_head.png">
                <router-link :to="{ name: 'comment', query: {}}" class="more_a fr" target="_blank">
                    查看更多>
                </router-link>
                <ul>
                    <li>
                        <img src="/static/images/demo05.png" height="210">
                        <div class="com-con">
                            <p>蒙娜丽莎婚纱摄影</p>
                             <div class="clearfix">
                                <label class="fl">媒体评定分：</label>
                                <div class="media_rating fl">
                                </div>
                            </div> 
                            <div class="clearfix">
                                <label>拍客评价：</label>
                                <span class="blog">
                                    拍婚照对于大多数人来说，人生也就一次，我们花了钱就一定是想有好的拍摄体验和成片效果的... ...
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="/static/images/demo05.png" height="210">
                        <div class="com-con">
                            <p>蒙娜丽莎婚纱摄影</p>
                             <div class="clearfix">
                                <label class="fl">媒体评定分：</label>
                                <div class="media_rating fl">
                                </div>
                            </div> 
                            <div class="clearfix">
                                <label>拍客评价：</label>
                                <span class="blog">
                                    拍婚照对于大多数人来说，人生也就一次，我们花了钱就一定是想有好的拍摄体验和成片效果的... ...
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="/static/images/demo05.png" height="210">
                        <div class="com-con">
                            <p>蒙娜丽莎婚纱摄影</p>
                             <div class="clearfix">
                                <label class="fl">媒体评定分：</label>
                                <div class="media_rating fl">
                                </div>
                            </div> 
                            <div class="clearfix">
                                <label>拍客评价：</label>
                                <span class="blog">
                                    拍婚照对于大多数人来说，人生也就一次，我们花了钱就一定是想有好的拍摄体验和成片效果的... ...
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="/static/images/demo05.png" height="210">
                        <div class="com-con">
                            <p>蒙娜丽莎婚纱摄影</p>
                             <div class="clearfix">
                                <label class="fl">媒体评定分：</label>
                                <div class="media_rating fl">
                                </div>
                            </div> 
                            <div class="clearfix">
                                <label>拍客评价：</label>
                                <span class="blog">
                                    拍婚照对于大多数人来说，人生也就一次，我们花了钱就一定是想有好的拍摄体验和成片效果的... ...
                                </span>
                            </div>
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
            getPhotoList: 'getPhotoList'
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
            skinBorder: '20px solid #f2f2f2',
            logo: '/static/images/logo-3.png',
            test: '/static/images/demo_01.jpg'
        }
    },
    mounted() {
        this.$store.dispatch('qryIndex')
    },
    methods: {
        photoLikeBtn() {
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
    },
    beforeDestroy() {
    }
}
</script>


<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/index.scss";
</style>
