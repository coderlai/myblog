<template>
    <nav class="navbar navbar-inverse navbar-fixed-top nav-main">
        <div class="container" style="padding: 0">
            <div class="navbar-header">
                <router-link to="/main" class="animated navbar-brand my-brand" @mouseover="isActive=true"
                             @mouseout="isActive=false" :class="{rotateIn:isActive}">主页

                </router-link>
                <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#my-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse navbar-collapse-responsive" id="my-collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown"><a href="#">待定</a></li>
                </ul>
                <ul class="nav navbar-nav pull-right" v-show="!isLogin">
                    <li class="right-nav">
                        <router-link to="/login">登录</router-link>
                    </li>
                    <li class="right-nav">
                        <router-link to="/register">注册</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav pull-right" v-show="isLogin">
                    <li class="right-nav"><a href="javascript:;">{{username}}</a></li>
                    <li class="right-nav"><a href="/api/logout">退出</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data(){
            return {
                isActive: true,
            }
        },
        methods: {
            getCookie: function (cookieName) {
                var cookies = document.cookie.split("; ");
                for (var i = 0; i < cookies.length; i++) {
                    var temp = cookies[i].split("=");
                    if (temp[0] === cookieName) return unescape(temp[1]);
                }
            }
        },
        computed: {
            isLogin(){
                return this.$store.state.isLogin;
            },
            username(){
                return this.$store.state.username;
            }
        },
        created: function () {
           var username = this.getCookie("username")
            if(username){
                this.$store.commit("changeLogin",{isLogin:true,username:username})
            }
        }
    }
</script>
<style>
    /*导航条自定义样式*/
    .nav-main {
        background-color: #34495e;
        height: 50px;
        min-height: 50px;
        padding: 0;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .24);
    }

    #my-collapse {
        background-color: #34495e;
    }

    .my-brand {
        color: #fff !important;
    }

    .right-nav > a, .dropdown > a {
        color: #fff !important;
    }
</style>
