<template>
    <div class="collect">
        <com-header></com-header>
        <div class="container">
            <div class="c-user fl">
                <img class="circle c-user-head" :src="userInfo.head" width="100" height="100">
                <p class="c-user-name">{{userInfo.nickname}}</p>
                <dl>
                    <dt>
                        <i class="icon_collage" @click="toggleDD"></i>
                        <a href="javascript:void(0)" @click="toggleDD">我的收藏</a>
                        <dd v-show="isDd">
                            <a href="javascript:void(0)">{{category.name}}</a>
                        </dd>
                    </dt>
                    <dt @click="logout()">
                        <a href="javascript:void(0)">
                            <i class="icon_logout"></i>退出登录</a>
                    </dt>
                </dl>
            </div>
            <div class="c-type fl">
                <div class="clearfix c-type-tag">
                    <ul>
                        <li v-for="(item,c) in ['按风格排序','按影楼排序']" :key="c" v-bind:class="{cur : isTag == c}" @click="changeTab(c)">
                            <a href="javascript:void(0)">{{item}}</a>
                        </li>
                    </ul>
                </div>
                <div class="clearfix c-type-list">
                    <ul v-if="getCollectList && getCollectList.length>0">
                        <li v-for="(item,ln) in getCollectList" :key="ln">
                            <div class="c-type-header">
                                <div class="fl c-type-header-name">{{item.name}}</div>
                                <div class="line fl">
                                    <div class="bar" v-bind:style="{ width: item.value }"></div>
                                </div>
                                <span class="percent">{{item.value}}</span>
                                <div v-show="ln == 0" class="fr c-type-router">
                                    <router-link to="/guide" target="_blank">
                                        去看看如何选择合适的婚纱照>
                                    </router-link>
                                </div>
                            </div>

                            <div class="c-type-photo">
                                <ul v-bind:class="{active:item.showall}">
                                    <li v-for="(img,m) in item.photo" :key="m">
                                        <div class="img-hover">
                                            <router-link :to="{ name: 'bottompage', params: {id: img.id, type: 2}}" target="_blank">
                                                <img v-lazy="img.img" width="320" height="200">
                                            </router-link>
                                        </div>
                                    </li>
                                    <li v-show="item.photo.length>3">
                                        <a v-if="!item.showall" href="javascript:void(0)" style="color:#4c4c4c" @click="showAll(ln)">展示全部</a>
                                        <a v-else-if="item.showall" href="javascript:void(0)" style="color:#b2b2b2" @click="showAll(ln)">收 起</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <div v-if="noData && getCollectList.length==0" class="no-data">
                        <img src="/static/images/icon-no-data-2.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import header from './../components/header';

export default {
    components: {
        comHeader: header
    },
    computed: {
        ...mapGetters({
            getCollectList: 'getCollectList',
            getCollectUserInfo: 'getCollectUserInfo'
        }),
        ...mapActions({
            qryMyCollectList: 'qryMyCollectList'
        })
    },
    data() {
        return {
            uid: '',
            type: this.$route.params.type,
            isDd: true,
            isTag: 0,
            userInfo: {},
            category: {},
            index: 0,
            noData:false,
        };
    },
    mounted() {
        try {
            let token = JSON.parse(localStorage.getItem('user'));
            this.uid = token.uid;
            if (!token) {
                window.location.href = '/login';
            }
            let ajaxdata = {
                uid: this.uid,
                type: this.type
            };
            this.$store.dispatch('qryMyCollectList', ajaxdata);
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        toggleDD() {
            this.isDd = !this.isDd;
        },
        changeTab(c) {
            this.isTag = c;
            let ajaxdata = {
                uid: this.uid,
                type: this.isTag
            };
            this.$store.dispatch('qryMyCollectList', ajaxdata);
        },
        showAll(ln) {
            this.$store.dispatch('collectListChange', ln);
        },
        logout() {
            this.$store.dispatch('loginOut', { toIndex: 1 });
        }
    },
    watch: {
        getCollectUserInfo() {
            this.userInfo = this.getCollectUserInfo;
            this.category = this.getCollectUserInfo.category;
        },
        getCollectList(){
            if(this.getCollectList && this.getCollectList.length > 0){
                this.noData = false;
            }else{
                this.noData = true;
            }
        }
    },
    beforeDestroy() {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.collect {
    margin-bottom: 65px;

    .c-user {
        position: relative;
        top: 20px;
        width: 185px;
        height: 600px;
        background: #fff;
        text-align: center;
        dl {
            position: relative;
            top: 5px;
            dt {
                position: relative;
                font-size: 14px;
                color: #262626;
                line-height: 27.28px;
                .icon_collage {
                    left: 39px;
                    top: 1px;
                }
                .icon_logout {
                    left: 39px;
                    top: 1px;
                }
                dd {
                    background: #ff4e6b;
                    border-radius: 5px;
                    font-size: 14px;
                    color: #ffffff;
                    margin: 5px 0;
                    height: 36px;
                    line-height: 36px;
                }
            }
        }
    }

    .c-user-head {
        margin-top: 20px;
    }

    .c-user-name {
        font-size: 20px;
        color: #ff4e6b;
        line-height: 27.28px;
        margin: 10px 0;
    }

    .c-type-tag {
        position: relative;
        top: 20px;
        width: 1000px;
        margin-left: 15px;
        li {
            display: inline-block;
            color: #4c4c4c;
            font-size: 14px;
            height: 28px;
            line-height: 27.28px;
            border-radius: 15px;
            width: 91px;
            text-align: center;
            margin-right: 15px;
            border: 1px solid #f2f2f2;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }
        li:hover {
            border: 1px solid #b3b3b3;
        }
        .cur {
            border: 1px solid #b3b3b3;
        }
    }

    .c-type-list {
        position: relative;
        top: 40px;
        width: 1000px;
        height: auto;
        margin-left: 15px;
        li {
            width: 100%;
            padding: 10px;
            overflow: hidden;
            background: #fff;
            margin-top: 10px;
            .c-type-header {
                width: 100%;
                display: inline-block;
                padding-bottom: 12px;
                border-bottom: 1px solid #e6e6e6;
                .c-type-header-name {
                    color: #262626;
                    font-size: 18px;
                    line-height: 27.28px;
                }
                .c-type-router {
                    color: #b2b2b2;
                    font-size: 12px;
                    line-height: 27.28px;
                }
                .line {
                    float: left;
                    width: 150px;
                    border: 1px solid #ffa9b7;
                    height: 10px;
                    border-radius: 10px;
                    background: #ffffff;
                    margin: 8px 7px 0 20px;
                }
                .line-store {
                    margin-top: 40px;
                }
                .percent {
                    float: left;
                    color: #808080;
                    font-size: 14px;
                    line-height: 27.28px;
                }

                .bar {
                    background: #ffa9b7;
                    float: left;
                    height: 100%;
                    border-radius: 10px;
                }

                .bar {
                    animation: animate-positive 2s;
                }
            }
        }
        .c-type-photo {
            position: relative;
            width: 100%;
            ul {
                overflow: hidden;
                width: 100%;
                height: 270px;
            }
            .active {
                height: auto;
                padding-bottom: 50px;
            }
            li {
                width: auto;
                float: left;
                padding: 8px 5px 0 0;
                .img-hover {
                    width: 320px;
                    height: 200px;
                    overflow: hidden;
                }
                img {
                    cursor: zoom-in;
                    transition: all 0.6s;
                }
                img:hover {
                    transform: scale(1.4);
                }
            }
            li:last-child {
                position: absolute;
                bottom: 0;
                width: 100%;
                text-align: center;
                margin-top: 10px; // filter:alpha(Opacity=90);
                // -moz-opacity:0.9;
                // opacity: 0.9;
                a {
                    display: block;
                    font-size: 12px;
                    height: 28px;
                    line-height: 28px;
                    border-top: 1px solid #e6e6e6;
                    width: 156px;
                    margin: 0 auto;
                }
            }
        }
    }
}
</style>
