<template>
    <div class="col-sm-3">
        <div class="online-contact-container">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">文章分类</h3>
            </div>
            <div class="list-group">
                <div class="list-group-item animated article-type" @mouseover="changeIndex(1)"  :class="{slideInRight:1 == currentIndex}">
                    <router-link to="/main/article/all"><img :src="images[0].src" alt />&nbsp;&nbsp;&nbsp;所有文章</router-link>
                </div>
                <div class="list-group-item animated article-type" @mouseover="changeIndex(2)"  :class="{slideInRight:2 == currentIndex}">
                    <router-link to="/main/article/h5"><img :src="images[1].src" alt />&nbsp;&nbsp;&nbsp;HTML5</router-link>
                </div>
                <div class="list-group-item animated article-type" @mouseover="changeIndex(3)"  :class="{slideInRight:3 == currentIndex}">
                    <router-link to="/main/article/css"><img :src="images[2].src" alt />&nbsp;&nbsp;&nbsp;CSS3</router-link>
                </div>
                <div class="list-group-item animated article-type" @mouseover="changeIndex(4)"  :class="{slideInRight:4 == currentIndex}">
                    <router-link to="/main/article/ajax"><img :src="images[3].src" alt />&nbsp;&nbsp;&nbsp;Ajax</router-link>
                </div>
                <div class="list-group-item animated article-type" @mouseover="changeIndex(5)"  :class="{slideInRight:5 == currentIndex}">
                    <router-link to="/main/article/php"><img :src="images[4].src" alt />&nbsp;&nbsp;&nbsp;PHP</router-link>
                </div>
                <div class="list-group-item animated article-type" @mouseover="changeIndex(6)"  :class="{slideInRight:6 == currentIndex}">
                    <router-link to="/main/article/node"><img :src="images[5].src" alt />&nbsp;&nbsp;&nbsp;Node.js</router-link>
                </div>
                <div class="list-group-item animated article-type" @mouseover="changeIndex(7)"  :class="{slideInRight:7 == currentIndex}">
                    <router-link to="/main/article/js"><img :src="images[6].src" alt />&nbsp;&nbsp;&nbsp;JS</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="site-state-container">
        <div class="panel panel-warning">
            <div class="panel-heading">
                <h3 class="panel-title time text-center">{{currentTime|formatDate('S')}}</h3>
            </div>
            <div>
                <datePicker></datePicker>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import datePicker from 'vue-date'
    export default {
        data(){
            return {
                currentIndex:0,
                currentTime:"",
                images:[
                    {src:'/img/all.png'},
                    {src:'/img/h5.png'},
                    {src:'/img/css.png'},
                    {src:'/img/ajax.png'},
                    {src:'/img/php.png'},
                    {src:'/img/node.png'},
                    {src:'/img/js.png'},
                ]
            }
        },
        created:function(){
            var _this = this
            var timer = setInterval(function () {
                var now = Date.now();
                _this.currentTime = now;
            },1000)
        },
        methods:{
            changeIndex:function(index){
                this.currentIndex = index;
            }
        },
        components:{
            datePicker
        }
    }
</script>
<style>
.list-group-item>a{
    text-decoration:none;
    color:#555!important;
}
</style>