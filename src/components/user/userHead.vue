<template>
    <div>
        <div class="user-header-top" :style="{background:skin, borderBottom:skinBorder}" v-show="!visHNav">
            <div class="container">
                <div class="logo">
                    <router-link to="/">
                        <img :src="logoTop" alt="大豫新娘帮">
                    </router-link>
                </div>
                <div class="nav clearfix">
                    <ul>
                        <li>
                            <router-link to="/user" class="nav_a" active-class="nav_active" exact>首页</router-link>
                        </li>
                        <li>
                            <router-link to="/guide" class="nav_a" active-class="nav_active">攻略</router-link>
                        </li>
                        <li>
                            <router-link to="/comment" class="nav_a" active-class="nav_active">点评</router-link>
                        </li>
                        <li>
                            <router-link to="/meal" class="nav_a" active-class="nav_active">套餐</router-link>
                        </li>
                    </ul>
                </div>
                <div class="user-search clearfix">
                    <div class="nav_search">
                        <input type="text" v-model.trim="keyword" placeholder="搜商家" class="nav_form" @keyup.enter="seaBtn">
                        <a href="javascript:void(0)" class="focus-search" @click="seaBtn">
                            <img src="/static/images/icon_search.png">
                        </a>
                    </div>
                    <a href="javascript:void(0)" class="nav_user" @click="userLogin">
                        <img :src="header" class="circle" width="30" height="30">
                        <ul class="nav_user_ul" v-show="isLogin">
                            <li>
                                <router-link :to="{ name: 'collect', query: {uid:uid,type:0}}" target="_blank">
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
    
        <!--向上滑动后展示小的头部菜单  -->
        <div class="user-header" :style="{background:skin, borderBottom:skinBorder}" v-show="visHNav">
            <div class="container">
                <div class="logo">
                    <router-link to="/">
                        <img :src="logo" alt="大豫新娘帮">
                    </router-link>
                </div>
                <div class="nav clearfix">
                    <ul>
                        <li>
                            <router-link to="/user" class="nav_a" active-class="nav_active" exact target="_blank">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/guide" class="nav_a" active-class="nav_active" target="_blank">攻略</router-link>
                        </li>
                        <li>
                            <router-link to="/comment" class="nav_a" active-class="nav_active" target="_blank">点评</router-link>
                        </li>
                        <li>
                            <router-link to="/meal" class="nav_a" active-class="nav_active" target="_blank">套餐</router-link>
                        </li>
                    </ul>
                </div>
                <div class="user-search clearfix">
                    <div class="nav_search">
                        <input type="text" v-model.trim="keyword" placeholder="" class="nav_form" @keyup.enter="seaBtn">
                        <a href="javascript:void(0)" class="focus-search" @click="seaBtn">
                            <img src="/static/images/icon_search.png">
                        </a>
                    </div>
                    <a href="javascript:void(0)" class="nav_user" @click="userLogin">
                        <img :src="header" class="circle" width="30" height="30">
                        <ul class="nav_user_ul" v-show="isLogin">
                            <li>
                                <router-link to="/collect" target="_blank">
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

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            visHNav: false,
            HNavOffset: 300,
            skin: '#fff',
            skinBorder: '3px solid #e4e4e4',
            logoTop: '/static/images/logo-2.png',
            logo: '/static/images/logo-4.png',
            keyword: null,
            header: '/static/images/user_icon.png',
            uid:null,
            isLogin:null,
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
            qryBusList: 'qryBusList',
            busClear: 'busClear'
        })
    },
    mounted() {
        try{
            let token = JSON.parse(localStorage.getItem('user'));
            this.isLogin = Boolean(token);
            if(this.isLogin){
                this.header = token.headimgurl
                this.uid = token.uid
            }else{
            }
        }catch(e){
            console.log(e)
        }
        let catchScroll = () => {
            if (window.pageYOffset >= parseInt(this.HNavOffset)) {
                this.visHNav = true
            } else if (window.pageYOffset < 50) {
                this.visHNav = false
            }
        }
        window.onscroll = catchScroll
        // this.onscroll(window, 'scroll', catchHeadScroll);
    },
    methods: {
        /**
         * 搜商家按钮事件
         */
        seaBtn() {
            this.$router.push({ name: 'comment' })
            let data = {
                keyword: this.keyword
            }
            this.$store.dispatch('busClear')
            this.$store.dispatch('qryBusList', data)
        },
        logout() {
            this.$store.dispatch('loginOut')
            this.$router.push({ name: 'index' })
        },
        userLogin(){
            if(!this.isLogin){
                window.location.href = 'http://dev.hunjia.qqdayu.com/login'
            }
        }
    },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.user-header-top,
{
    width: 100%;
    height: 250px;
    border-bottom: 2px solid #ff4e6b;
    position: relative;
    top: 0;
    z-index: 3;
    text-align: center;
    .logo {
        position: relative;
        top: 60px;
        height: auto;
        width: 100%;
    }
    .nav {
        position: relative;
        top: 80px;
        height: auto;
        width: 100%;
        li {
            display: inline-block;
            white-space: nowrap;
            margin-right: 84px;
            a {
                line-height: 40px;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                color: #363637;
                padding-bottom: 10px;
                -webkit-transition: all .6s ease;
                transition: all .3s ease;
            }
        }
        li:last-child {
            margin-right: 0;
        }
        .nav_a:hover {
            color: #ff4e6b;
        }
        .nav_active {
            color: #ff4e6b;
            border-bottom: 3px solid #ff4e6b;
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
        line-height: 30px;
        z-index: 10;
        padding-left: 10px;
        color: #808080;
        font-size: 12px;
        line-height: 40px;
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
    // .nav_form {
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //     border: none;
    //     outline: none;
    //     width: 98%;
    //     height: 30px;
    //     line-height: 30px;
    //     z-index: 10;
    //     padding-left: 10px;
    //     background: transparent;
    //     color: #808080;
    //     font-size: 12px;
    //     line-height: 40px;
    //     filter: alpha(Opacity=0);
    //     -moz-opacity: 0;
    //     opacity: 0;
    //     -webkit-transition: width 0.3s;
    //     -moz-transition: width 0.3s;
    //     transition: width 0.3s;
    // }
    // .nav_form:focus {
    //     border: 1px solid #d9d9d9;
    //     width: 150px;
    //     border-radius: 15px;
    //     background: #f2f2f2;
    //     right: 50px;
    //     filter: alpha(Opacity=100);
    //     -moz-opacity: 1;
    //     opacity: 1;
    // }
}


.nav_user {
    padding: 20px 0 20px 7px;
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
    -webkit-transition: all .2s;
    transition: all .2s;
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

// .nav_user_ul:before {
//     content: "";
//     width: 0;
//     height: 0;
//     position: absolute;
//     top: -10px;
//     left: 50%;
//     border-bottom: 10px solid #ccc;
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
// }
// .nav_user_ul:after {
//     content: "";
//     width: 0;
//     height: 0;
//     position: absolute;
//     top: -9px;
//     left: 50%;
//     border-bottom: 10px solid #fff;
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
//     z-index: 1;
// }
.nav_user_ul a {
    display: block;
    padding: 9px 30px;
}

.nav_user_ul a:hover {
    background: #f1efef;
}

.user-header {
    width: 100%;
    height: 68px;
    border-bottom: 2px solid #ff4e6b;
    position: fixed;
    top: 0;
    z-index: 9999;
    .logo {
        position: relative;
        height: auto;
        float: left;
    }
    .nav {
        position: relative;
        line-height: 68px;
        height: auto;
        text-align: center;
        li {
            display: inline-block;
            white-space: nowrap;
            margin-right: 84px;
            a {
                line-height: 40px;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                color: #363637;
                padding-bottom: 10px;
                -webkit-transition: all .6s ease;
                transition: all .3s ease;
            }
        }
        li:last-child {
            margin-right: 0;
        }
        .nav_a:hover {
            border-bottom: 3px solid #ff4e6b;
            color: #ff4e6b;
        }
        .nav_active {
            color: #ff4e6b;
            border-bottom: 3px solid #ff4e6b;
        }
    }
}
</style>
