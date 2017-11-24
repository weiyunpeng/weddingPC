<template>
    <div class="page-head">
        <div class="user-header" :style="{borderBottom:skinBorder}">
            <div class="container">
                <div class="logo">
                    <router-link to="/index">
                        <img :src="logo" alt="大豫新娘帮" style="position: relative;top: 7px;">
                    </router-link>
                </div>
                <div class="nav clearfix">
                    <ul>
                        <li>
                            <router-link to="/index" class="nav_a base-color" active-class="nav_active" exact>首页</router-link>
                        </li>
                        <li>
                            <router-link to="/user" class="nav_a base-color" active-class="nav_active">婚纱照</router-link>
                        </li>
                        <li>
                            <router-link to="/guide" class="nav_a base-color" active-class="nav_active">攻略</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'comment', params: { cid: 1 }}" class="nav_a" active-class="nav_active">商家</router-link>
                        </li>
                    </ul>
                </div>
                <div class="user-search clearfix">
                    <div class="nav_search" v-if="bus">
                        <input type="text" v-model.trim="keyword" placeholder="搜商家" class="nav_form" @keyup.enter="seaBtn">
                        <a href="javascript:void(0)" class="focus-search" @click="seaBtn">
                            <img src="/static/images/icon_search.png">
                        </a>
                    </div>
                    <a href="javascript:void(0)" class="nav_user">
                        <img :src="header" class="circle" width="30" height="30" @click="userLogin" v-on="{ mouseover: showHeader ,mouseout:hideHeader}">
                        <ul class="nav_user_ul" v-show="isLogin">
                            <li>
                                <router-link :to="{ name: 'collect', params: {type:0}}">
                                    <i class="icon_collage"></i>我的收藏
                                </router-link>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="text-center" @click="logout()">
                                    <i class="icon_logout"></i>退出登录</a>
                            </li>
                        </ul>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            skinBorder: '3px solid #e4e4e4',
            logoTop:
                'http://marriage-1251225286.file.myqcloud.com/static/images/logo.png',
            logo:
                'http://static-1251225286.cossh.myqcloud.com/hunjia/logo%402x.png',
            keyword: null || this.$route.query.keyword,
            header: '/static/images/icon-user.png',
            uid: null,
            isLogin: null,
            bus: this.$route.params.cid,
            type: this.$route.params.type,
        };
    },
    computed: {
        ...mapGetters({
            getAuth: 'getAuth'
        }),
        ...mapActions({
            qryStoreList: 'qryStoreList',
            shopListClear: 'shopListClear'
        })
    },
    mounted() {
        this.$store.dispatch('getUserInfo');
    },
    methods: {
        /**
             * 搜商家按钮事件
             */
        seaBtn() {
            this.$router.push({
                name: 'comment',
                query: { keyword: this.keyword }
            });
            let data = {
                keyword: this.keyword
            };
            this.$store.dispatch('shopListClear');
            this.$store.dispatch('qryStoreList', data);
        },
        logout() {
            if(this.type == 0){
                this.$store.dispatch('loginOut', { toIndex: 1 });
            }else{
                this.$store.dispatch('loginOut', { toIndex: 0 });
            }
            this.isLogin = false;
            this.header = '/static/images/icon-user-hover.png';
        },
        userLogin() {
            if (!this.isLogin) {
                window.location.href = '/login';
            }
        },
        showHeader() {
            if (!this.isLogin) {
                this.header = '/static/images/icon-user-hover.png';
            }
        },
        hideHeader() {
            if (!this.isLogin) {
                this.header = '/static/images/icon-user.png';
            }
        }
    },
    watch: {
        getAuth() {
            let token = this.getAuth;
            if (token) {
                this.isLogin = true;
                this.header = token.headimgurl;
                this.uid = token.uid;
            } else {
                this.isLogin = false;
                this.header = '/static/images/icon-user-hover.png';
            }
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import './../assets/css/base.scss';
.page-head {
    .user-header {
        width: 100%;
        height: 78px;
        background: #fff;
        position: relative;
        top: 0;
        z-index: 9999;
        .logo {
            position: relative;
            top: 10px;
            height: auto;
            float: left;
        }
        .nav {
            position: relative;
            top: 10px;
            line-height: 68px;
            height: auto;
            text-align: center;
            li {
                display: inline-block;
                white-space: nowrap;
                margin-right: 84px;
                a {
                    width: 27px;
                    height: 12px;
                    font-size: 18px;
                    text-align: center;
                    color: #333333;
                    padding-bottom: 12px;
                    -webkit-transition: all 0.6s ease;
                    transition: all 0.3s ease;
                }
            }
            li:last-child {
                margin-right: 0;
            }
            .nav_a:hover {
                color: $color-hover;
                border-bottom: 3px solid $color-hover;
            }
            .nav_active {
                color: $color-hover;
                border-bottom: 3px solid $color-hover;
            }
        }
    }
    .user-search {
        position: absolute;
        bottom: 11px;
        right: 0;
        .nav_search {
            width: 0%;
            min-width: 60px;
            height: 30px;
            position: relative;
            top: 12px;
            display: inline-block;
            border-right: 1px solid #d9d9d9;
        }
        .focus-search {
            position: absolute;
            right: 8px;
            top: 0px;
        }
        .nav_form {
            position: absolute;
            top: 0;
            outline: none;
            height: 30px;
            z-index: 10;
            padding-left: 10px;
            color: #808080;
            font-size: 12px;
            border: 1px solid #d9d9d9;
            width: 150px;
            border-radius: 15px;
            background: #f2f2f2;
            right: 50px;
            filter: alpha(Opacity=100);
            -moz-opacity: 1;
            opacity: 1;
            -webkit-transition: width 0.3s;
            -moz-transition: width 0.3s;
            transition: width 0.3s;
        }
    }
    .nav_user {
        padding: 120px 0 120px 7px;
    }
    .nav_user:hover .nav_user_ul {
        display: block;
    }
    .nav_user_ul {
        position: absolute;
        width: 117px;
        top: 45px;
        right: -20px;
        z-index: 3;
        font-size: 12px;
        background: #fff;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 2px;
        box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.2);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        display: none;
    }
    .nav_user_line {
        padding: 0;
        height: 3px;
        position: relative;
        top: -1px;
        display: block;
        margin: 0 -2px;
        border-bottom: 1px solid #d9d9d9;
    }
    .nav_user_ul a {
        display: block;
        padding: 9px 30px;
    }
    .nav_user_ul a:hover {
        background: #f1efef;
    }
}
</style>
