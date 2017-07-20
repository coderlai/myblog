import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import loginComponent from './components/login.vue'
import registerComponent from './components/register.vue'
import mainComponent from './components/main.vue'
import detailComponent from './components/detail.vue'
import articleListComponent from './components/articleList.vue';
import postComponent from './components/postArticle.vue';
import styles from './assert/style.scss'
import VueQuillEditor from 'vue-quill-editor'
import Modal from './components/modal.vue'


//开启debug模式
Vue.config.debug = true;

//应用插件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueQuillEditor)
Vue.component('modal',Modal)

//生成vuex实例
const store = new Vuex.Store({
    state: {
        isLogin: false,
        username: '',
        show:false,
        msg:''
    },
    mutations: {
        changeLogin: function (state, data) {
            state.isLogin = data.isLogin;
            state.username = data.username;
            console.log('数据', data)
        },
        toggleModal:function (state, data) {
            state.show = data.show
            state.msg = data.msg
        }
    }
});

//创建路由
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/login',
        component: loginComponent
    }, {
        path: '/register',
        component: registerComponent
    }, {
        path:'/post',
        component:postComponent
    }, {
        path: "/main",
        component: mainComponent,
        children: [{
            path: 'article/:type',
            component: articleListComponent
        }, {
            path: 'detail/:id',
            component: detailComponent
        }, {
            path: '/',
            redirect: 'article/all'
        }]
    }, {
        path: '/',
        redirect: '/main'
    }]
});
//自定义过滤器
Vue.filter('formatDate', function (time, type) {
    function addZero(num) {
        return parseInt(num) >= 10 ? num : "0" + parseInt(num);
    }

    const date = new Date(time);
    if (type === "M") {
        return date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate()) + " " + addZero(date.getHours()) + "-" + addZero(date.getMinutes());
    } else {
        return date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate()) + " " + addZero(date.getHours()) + "-" + addZero(date.getMinutes()) + "-" + addZero(date.getSeconds());
    }
});

const app = new Vue({
    router: router,
    store,
    render: h => h(App),
}).$mount("#app");